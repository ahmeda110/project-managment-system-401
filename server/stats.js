const { SupabaseConnector } = require('./SupabaseConnector');

class Stats {
    constructor() {
        this.supabaseConnector = SupabaseConnector.getInstance();
        this.client = this.supabaseConnector.getSupabaseClient();
    }

    async getProjectsAndTasksRatio() {
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
    
            // Calculate completed and uncompleted tasks
            const completedTasks = allTasks.filter(task => task.status === 'Completed').length;
            const uncompletedTasks = totalTasks - completedTasks;
    
            // Calculate ratio
            const ratio = totalProjects / totalTasks;
    
            return { totalProjects, totalTasks, completedTasks, uncompletedTasks, ratio };
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
            const totalMembers = allMemberIds.length;
            const totalIdleMembers = allMemberIds.filter(memberId => !assignedMemberIds.includes(memberId)).length;

            return { totalMembers, totalIdleMembers };
        } catch (error) {
            console.error("Error:", error.message);
            throw error;
        }
    }
}

module.exports = Stats;
