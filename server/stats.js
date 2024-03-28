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

    async  getTasksPerMonth() {
        try {
            const supabaseConnector = SupabaseConnector.getInstance();
            const client = supabaseConnector.getSupabaseClient();
    
            // Query the task table to retrieve due dates of tasks
            const { data: tasks, error } = await client
                .from('task')
                .select('due_date');
    
            if (error) {
                throw error;
            }
    
            // Initialize an object to store the count of tasks completed in each month
            const tasksPerMonth = {};
    
            // Loop through the tasks to extract the month and count tasks for each month
            tasks.forEach(task => {
                const dueDate = new Date(task.due_date);
                const month = dueDate.toLocaleString('en-US', { month: 'long' });
                const year = dueDate.getFullYear();
    
                // Create a key in the tasksPerMonth object if it doesn't exist
                if (!tasksPerMonth[`${year}-${month}`]) {
                    tasksPerMonth[`${year}-${month}`] = 0;
                }
    
                // Increment the count of tasks for the respective month
                tasksPerMonth[`${year}-${month}`]++;
            });
    
            return tasksPerMonth;
        } catch (error) {
            console.error('Error:', error.message);
            throw error;
        }
    }
    
    

}

module.exports = Stats;
