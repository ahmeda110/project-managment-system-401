const { SupabaseConnector } = require("./SupabaseConnector");

class Projects {
  constructor() {
    this.supabaseConnector = SupabaseConnector.getInstance();
    this.client = this.supabaseConnector.getSupabaseClient();
  }

  async createProject(name) {
    try {
      const { data, error } = await this.client
        .from("project")
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
      const { data, error } = await this.client.from("project").select("*");
      if (error) throw error;
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteProject(projectId) {
    try {
      const supabase = SupabaseConnector.getInstance().getSupabaseClient();

      // Delete tasks related to the project
      const deleteTaskResponse = await supabase
        .from("task")
        .delete()
        .eq("project_id", projectId);

      if (deleteTaskResponse.error) {
        throw deleteTaskResponse.error;
      }

      // Delete project members related to the project
      const deleteMemberResponse = await supabase
        .from("project_member")
        .delete()
        .eq("project_id", projectId);

      if (deleteMemberResponse.error) {
        throw deleteMemberResponse.error;
      }

      // Now delete the project from the project table
      const deleteProjectResponse = await supabase
        .from("project")
        .delete()
        .match({ project_id: projectId });

      if (deleteProjectResponse.error) {
        throw deleteProjectResponse.error;
      }

      return deleteProjectResponse.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // projectsService.js

  async getProjectNameById(projectId) {
    try {
      const supabase = SupabaseConnector.getInstance().getSupabaseClient();

      const { data, error } = await supabase
        .from("project")
        .select("name")
        .eq("project_id", projectId)
        .single();

      if (error) {
        throw error;
      }

      if (!data) {
        throw new Error("Project not found");
      }
      
      return data.name;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
module.exports = Projects;
