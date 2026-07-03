-- =========================================================================
-- DATABASE MIGRATION: 01_RLS_MULTI_TENANCY
-- Target Engine: PostgreSQL 15+
-- Action: Enable RLS, set up tenant policy helpers, and enforce policies.
-- =========================================================================

-- 1. Helper function to check if the current user is a Super Admin
CREATE OR REPLACE FUNCTION is_super_admin() 
RETURNS BOOLEAN AS $$
BEGIN
    RETURN current_setting('app.current_user_role', true) = 'super_admin';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Helper function to get the current tenant school_id from session context
CREATE OR REPLACE FUNCTION get_current_school_id() 
RETURNS UUID AS $$
BEGIN
    RETURN NULLIF(current_setting('app.current_school_id', true), '')::uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Enable Row-Level Security on all tenant-specific tables
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE academic_years ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE teacher_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE parent_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE gradebook_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE fee_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE fee_structures ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_fee_ledgers ENABLE ROW LEVEL SECURITY;
ALTER TABLE fee_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE school_broadcasts ENABLE ROW LEVEL SECURITY;
ALTER TABLE teacher_parent_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_compass_chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_compass_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_gap_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_roadmaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE bulk_ingestion_logs ENABLE ROW LEVEL SECURITY;

-- 4. Create Multi-Tenant Isolation Policies
-- Schools: Super Admin manages all, School Admin/Principal/Teacher reads/writes their own school
CREATE POLICY school_isolation_policy ON schools
    FOR ALL USING (is_super_admin() OR id = get_current_school_id());

-- Users: Isolated by school_id
CREATE POLICY user_isolation_policy ON users
    FOR ALL USING (is_super_admin() OR school_id = get_current_school_id());

-- Academic Years: Scoped by school_id
CREATE POLICY academic_years_isolation ON academic_years
    FOR ALL USING (is_super_admin() OR school_id = get_current_school_id());

-- Classes: Scoped by school_id
CREATE POLICY classes_isolation ON classes
    FOR ALL USING (is_super_admin() OR school_id = get_current_school_id());

-- Class Sections: Joined or scoped by class/school parameters
CREATE POLICY class_sections_isolation ON class_sections
    FOR ALL USING (
        is_super_admin() OR 
        class_id IN (SELECT id FROM classes WHERE school_id = get_current_school_id())
    );

-- Subjects: Scoped by school_id
CREATE POLICY subjects_isolation ON subjects
    FOR ALL USING (is_super_admin() OR school_id = get_current_school_id());

-- Teacher Profiles: Scoped by user/school join
CREATE POLICY teacher_profiles_isolation ON teacher_profiles
    FOR ALL USING (
        is_super_admin() OR 
        user_id IN (SELECT id FROM users WHERE school_id = get_current_school_id())
    );

-- Parent Profiles: Scoped by user/school join
CREATE POLICY parent_profiles_isolation ON parent_profiles
    FOR ALL USING (
        is_super_admin() OR 
        user_id IN (SELECT id FROM users WHERE school_id = get_current_school_id())
    );

-- Student Profiles: Scoped by user/school join
CREATE POLICY student_profiles_isolation ON student_profiles
    FOR ALL USING (
        is_super_admin() OR 
        user_id IN (SELECT id FROM users WHERE school_id = get_current_school_id())
    );

-- Attendance Records: Scoped by class section school context
CREATE POLICY attendance_records_isolation ON attendance_records
    FOR ALL USING (
        is_super_admin() OR 
        class_section_id IN (SELECT cs.id FROM class_sections cs JOIN classes c ON cs.class_id = c.id WHERE c.school_id = get_current_school_id())
    );

-- Assignments: Scoped by class section school context
CREATE POLICY assignments_isolation ON assignments
    FOR ALL USING (
        is_super_admin() OR 
        class_section_id IN (SELECT cs.id FROM class_sections cs JOIN classes c ON cs.class_id = c.id WHERE c.school_id = get_current_school_id())
    );

-- Student Assignments: Scoped by student profile school context
CREATE POLICY student_assignments_isolation ON student_assignments
    FOR ALL USING (
        is_super_admin() OR 
        student_id IN (SELECT sp.id FROM student_profiles sp JOIN users u ON sp.user_id = u.id WHERE u.school_id = get_current_school_id())
    );

-- Gradebook Entries: Scoped by student profile school context
CREATE POLICY gradebook_entries_isolation ON gradebook_entries
    FOR ALL USING (
        is_super_admin() OR 
        student_id IN (SELECT sp.id FROM student_profiles sp JOIN users u ON sp.user_id = u.id WHERE u.school_id = get_current_school_id())
    );

-- Fee Categories: Scoped by school_id
CREATE POLICY fee_categories_isolation ON fee_categories
    FOR ALL USING (is_super_admin() OR school_id = get_current_school_id());

-- Fee Structures: Scoped by class school context
CREATE POLICY fee_structures_isolation ON fee_structures
    FOR ALL USING (
        is_super_admin() OR 
        class_id IN (SELECT id FROM classes WHERE school_id = get_current_school_id())
    );

-- Student Fee Ledgers: Scoped by student school context
CREATE POLICY student_fee_ledgers_isolation ON student_fee_ledgers
    FOR ALL USING (
        is_super_admin() OR 
        student_id IN (SELECT sp.id FROM student_profiles sp JOIN users u ON sp.user_id = u.id WHERE u.school_id = get_current_school_id())
    );

-- Fee Payments: Scoped by ledger student school context
CREATE POLICY fee_payments_isolation ON fee_payments
    FOR ALL USING (
        is_super_admin() OR 
        student_fee_ledger_id IN (
            SELECT sfl.id FROM student_fee_ledgers sfl 
            JOIN student_profiles sp ON sfl.student_id = sp.id 
            JOIN users u ON sp.user_id = u.id 
            WHERE u.school_id = get_current_school_id()
        )
    );

-- School Broadcasts: Scoped by school_id
CREATE POLICY broadcasts_isolation ON school_broadcasts
    FOR ALL USING (is_super_admin() OR school_id = get_current_school_id());

-- Teacher Parent Messages: Scoped by sender/receiver school context
CREATE POLICY parent_messages_isolation ON teacher_parent_messages
    FOR ALL USING (
        is_super_admin() OR 
        sender_id IN (SELECT id FROM users WHERE school_id = get_current_school_id())
    );

-- AI Compass Chats & Messages: Scoped by student school context
CREATE POLICY ai_chats_isolation ON ai_compass_chats
    FOR ALL USING (
        is_super_admin() OR 
        student_id IN (SELECT sp.id FROM student_profiles sp JOIN users u ON sp.user_id = u.id WHERE u.school_id = get_current_school_id())
    );

CREATE POLICY ai_messages_isolation ON ai_compass_messages
    FOR ALL USING (
        is_super_admin() OR 
        chat_session_id IN (
            SELECT ac.id FROM ai_compass_chats ac 
            JOIN student_profiles sp ON ac.student_id = sp.id 
            JOIN users u ON sp.user_id = u.id 
            WHERE u.school_id = get_current_school_id()
        )
    );

-- Skill Gap & Career Roadmaps: Scoped by student school context
CREATE POLICY skill_gaps_isolation ON skill_gap_profiles
    FOR ALL USING (
        is_super_admin() OR 
        student_id IN (SELECT sp.id FROM student_profiles sp JOIN users u ON sp.user_id = u.id WHERE u.school_id = get_current_school_id())
    );

CREATE POLICY roadmaps_isolation ON career_roadmaps
    FOR ALL USING (
        is_super_admin() OR 
        student_id IN (SELECT sp.id FROM student_profiles sp JOIN users u ON sp.user_id = u.id WHERE u.school_id = get_current_school_id())
    );

-- Ingestion Logs: Scoped by school_id
CREATE POLICY bulk_ingestion_logs_isolation ON bulk_ingestion_logs
    FOR ALL USING (is_super_admin() OR school_id = get_current_school_id());
