const Projects = require('./Projects');
const { SupabaseConnector } = require('./SupabaseConnector');

class Tasks {
    constructor() {
        this.supabaseConnector = SupabaseConnector.getInstance();
        this.client = this.supabaseConnector.getSupabaseClient();
    }

    async createTask(status, name, description, priority, assigned_to, due_date, project_id) {
        try {
            const { data, error } = await this.client
                .from('task')
                .insert({ status, name, description, priority, assigned_to, due_date, project_id })
                .single();
            if (error) throw error;
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    

    async getTasks() {
        try {
            const { data, error } = await this.client
                .from('task')
                .select('*');
            if (error) throw error;
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updateTask(id, updates) {
        try {
            const { data, error } = await this.client
                .from('task')
                .update(updates)
                .match({ task_id: id }) // Use the id parameter here
                .single();
            if (error) throw error;
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async deleteTask(taskId) {
        try {
            const { data, error } = await this.client
                .from('task')
                .delete()
                .match({ task_id: taskId }) // Use task_id as the column name
                .single();
            if (error) throw error;
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    
}

module.exports = Tasks;
