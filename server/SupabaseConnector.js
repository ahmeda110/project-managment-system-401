const { createClient } = require('@supabase/supabase-js');

class SupabaseConnector {
    constructor() {
        if (!SupabaseConnector.instance) {
            this.supabaseUrl = 'https://oscarlhzwiopxrxcrdpw.supabase.co';
            this.supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zY2FybGh6d2lvcHhyeGNyZHB3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMDg4NTY1NSwiZXhwIjoyMDI2NDYxNjU1fQ.sUmxVhRDOJ-oW93sM8YnPfSwjCSLVPU7Rqw597MxGT8'; 
            this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
            SupabaseConnector.instance = this;
        }
        return SupabaseConnector.instance;
    }
    static getInstance() {
        return this.instance || new SupabaseConnector();
    }
    getSupabaseClient() {
        return this.supabase;
    }
}
module.exports = { SupabaseConnector };
