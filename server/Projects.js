const { SupabaseConnector } = require('./SupabaseConnector');

class Projects {
    constructor() {
        this.supabaseConnector = SupabaseConnector.getInstance();
        this.client = this.supabaseConnector.getSupabaseClient();
    }

    async createProject(name) {
        try {
            const { data, error } = await this.client
                .from('project')
                .insert({ name })
                .single();
            if (error) throw error;
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    

    async getProjects() {
        try {
            const { data, error } = await this.client
                .from('project')
                .select('*');
            if (error) throw error;
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updateProject(id, updates) {
        try {
            const { data, error } = await this.client
                .from('project')
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

    async deleteProject(id) {
        try {
            const { data, error } = await this.client
                .from('project')
                .delete()
                .match({ id })
                .single();
            if (error) throw error;
            return data;
        } 
        catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = Projects;
