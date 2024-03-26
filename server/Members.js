const { SupabaseConnector } = require('./SupabaseConnector');

class Members {
    constructor() {
        this.supabaseConnector = SupabaseConnector.getInstance();
        this.client = this.supabaseConnector.getSupabaseClient();
    }

    async createMember(email, name, phone_number, permission) {
        try {
            const { data, error } = await this.client
                .from('member')
                .insert({ email, name, phone_number, permission })
                .single();
            if (error) throw error;
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    

    async getMembers() {
        try {
            const { data, error } = await this.client
                .from('member')
                .select('*');
            if (error) throw error;
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updateMember(memberId, updates) {
        try {
            const { data, error } = await this.client
                .from('member')
                .update(updates)
                .match({ member_id: memberId })
                .single();
            if (error) throw error;
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async deleteMember(memberId) {
        try {
            await this.client.transaction(async (tx) => {
                // Delete references from project_member table
                await tx.from('project_member')
                    .delete()
                    .eq('member_id', memberId);
    
                // Now delete the member from the members table
                const { data, error } = await tx.from('members')
                    .delete()
                    .match({ member_id: memberId })
                    .single();
    
                if (error) throw error;
    
                return data;
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    

    async getMemberById(memberId) {
        try {
            const { data, error } = await this.client
                .from('member')
                .select('*')
                .eq('member_id', memberId)
                .single();
            if (error) throw error;
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getMemberNameById(memberId) {
        try {
            const { data, error } = await this.client
                .from('member')
                .select('name')
                .eq('member_id', memberId)
                .single();
            if (error) throw error;
            return data.name;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    
    
}

module.exports = Members;
