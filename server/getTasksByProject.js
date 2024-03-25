const { SupabaseConnector } = require('./SupabaseConnector');

class TasksByProject {
    constructor() {
        this.supabaseConnector = SupabaseConnector.getInstance();
        this.client = this.supabaseConnector.getSupabaseClient();
    }

    async getTasksByProject(projectId) {
        try {
            const { data: projectTasks, error: projectTasksError } = await this.client
                .from('project_task')
                .select('task_id')
                .eq('project_id', projectId);
            if (projectTasksError) throw projectTasksError;

            const taskIds = projectTasks.map(task => task.task_id);

            const { data: tasks, error: tasksError } = await this.client
                .from('task')
                .select('*')
                .in('task_id', taskIds);

            if (tasksError) throw tasksError;

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
