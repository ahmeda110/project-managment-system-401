const { SupabaseConnector } = require('./SupabaseConnector');

class TasksByProject {
    constructor() {
        this.supabaseConnector = SupabaseConnector.getInstance();
        this.client = this.supabaseConnector.getSupabaseClient();
    }

    async getTasksByProject(projectId) {
        try {
            const { data: tasks, error } = await this.client
                .from('task')
                .select('*')
                .eq('project_id', projectId);
            
            if (error) throw error;
    
            return tasks;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getTasksByMember(memberId) {
        try {
            const { data: tasks, error: tasksError } = await this.client
                .from('task')
                .select('*')
                .eq('assigned_to', memberId);
            
            if (tasksError) throw tasksError;

            return tasks;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = TasksByProject;
