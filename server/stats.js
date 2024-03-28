const { SupabaseConnector } = require('./SupabaseConnector');

class Stats {
    constructor() {
        this.supabaseConnector = SupabaseConnector.getInstance();
        this.client = this.supabaseConnector.getSupabaseClient();
    }

    async getProjectTaskMemberStats() {
        try {
            // Get total projects
            const { data: projects, error: projectsError } = await this.client
                .from('project')
                .select('*');
            if (projectsError) throw projectsError;
    
            const totalProjects = projects.length;
    
            // Get total tasks
            const { data: allTasks, error: tasksError } = await this.client
                .from('task')
                .select('*');
            if (tasksError) throw tasksError;
    
            const totalTasks = allTasks.length;
    
            // Get total members
            const { data: allMembers, error: membersError } = await this.client
                .from('member')
                .select('*');
            if (membersError) throw membersError;
    
            const totalMembers = allMembers.length;
    
            // Get total idle members
            const { totalIdleMembers } = await this.getIdleMembers();
    
            return { totalProjects, totalTasks, totalMembers, totalIdleMembers };
        } catch (error) {
            console.error("Error:", error.message);
            throw error;
        }
    }

    async getIdleMembers() {
        try {
            // Get all members assigned to tasks
            const { data: assignedMembers, error: assignedMembersError } = await this.client
                .from('task')
                .select('assigned_to');

            if (assignedMembersError) throw assignedMembersError;

            // Flatten the assignedMembers array and remove duplicates
            const assignedMemberIds = [...new Set(assignedMembers.map(task => task.assigned_to))];

            // Get all members
            const { data: allMembers, error: allMembersError } = await this.client
                .from('member')
                .select('member_id');

            if (allMembersError) throw allMembersError;

            // Flatten the allMembers array
            const allMemberIds = allMembers.map(member => member.member_id);

            // Calculate idle members
            const totalIdleMembers = allMemberIds.filter(memberId => !assignedMemberIds.includes(memberId)).length;

            return { totalIdleMembers };
        } catch (error) {
            console.error("Error:", error.message);
            throw error;
        }
    }

    async getTasksStatus() {
        try {
            // Query tasks table to retrieve completed tasks
            const { data: allTasks, error } = await this.client
                .from('task')
                .select('*');
        
            if (error) throw error;
    
            // Calculate total number of tasks
            const totalTasks = allTasks.length;
    
            // Count completed tasks
            const completedTasks = allTasks.filter(task => task.status === true).length;
    
            // Calculate uncompleted tasks
            const uncompletedTasks = totalTasks - completedTasks;
    
            return { totalTasks, completedTasks, uncompletedTasks };
        } catch (error) {
            console.error('Error:', error.message);
            throw error;
        }
    }
    
    

}

module.exports = Stats;
