const { SupabaseConnector } = require('./SupabaseConnector');

class Chat {
    constructor() {
        this.supabaseConnector = SupabaseConnector.getInstance();
        this.client = this.supabaseConnector.getSupabaseClient();
    }

    async createChat(member_id_to, member_id_from, message) {
        try {
            const { data, error } = await this.client
                .from('chat')
                .insert({ member_id_to, member_id_from, message })
                .single();
            if (error) throw error;
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
 
    async deleteChat(chatId) {
        try {
            const { data, error } = await this.client
                .from('chat')
                .delete()
                .match({ chat_id: chatId }) // Use chat_id as the column name
                .single();
            if (error) throw error;
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getChatsByRecipient(memberIdTo, memberfrom) {
        try {
            const { data: receivedChats, error: receivedError } = await this.client
                .from('chat')
                .select('*')
                .eq('member_id_to', memberIdTo)
                .order('created_at', { ascending: true });
    
            if (receivedError) {
                throw receivedError;
            }
    
            const { data: sentChats, error: sentError } = await this.client
                .from('chat')
                .select('*')
                .eq('member_id_from', memberIdTo)
                .order('created_at', { ascending: true });
    
            if (sentError) {
                throw sentError;
            }
    
            // Merge received and sent chats and sort them by created_at
            const allChats = [...receivedChats, ...sentChats].sort((a, b) => a.created_at - b.created_at);
            const filteredChats = allChats.filter(chat => {
                return (chat.member_id_from === memberfrom && chat.member_id_to === memberIdTo) ||
                       (chat.member_id_from === memberIdTo && chat.member_id_to === memberfrom);
            });
            return filteredChats;
      
            // return allChats;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }    
    
}

module.exports = Chat;
