const { SupabaseConnector } = require('./SupabaseConnector');

class Tasks {
    constructor() {
        this.supabaseConnector = SupabaseConnector.getInstance();
        this.client = this.supabaseConnector.getSupabaseClient();
    }

    async createTask(name, description, date) {
        try {
            const { data, error } = await this.client
                .from('task')
                .insert({ name, description, date, complete: false })
                .single();
            if (error) throw error;
            // if (!data) throw new Error("Failed to create task");
            // return data;
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
                .match({ id })
                .single();
            if (error) throw error;
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async deleteTask(id) {
        try {
            const { data, error } = await this.client
                .from('task')
                .delete()
                .match({ id })
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
