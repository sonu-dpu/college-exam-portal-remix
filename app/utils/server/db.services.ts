import { getSupabase } from "./supabase.server";

const dbService = {
  async getTableData(request: Request, tableName: string) {
    const { supabase } = getSupabase(request);
    const { data, error } = await supabase.from(tableName).select("*");
    if (error) {
      return { error: error.message, status: 500 };
    }
    return { data, status: 200 };
  },

  async getItemById(request: Request, tableName: string, id: string | number) {
    const { supabase } = getSupabase(request);
    const { data, error } = await supabase
      .from(tableName)
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      return { error: error.message, status: 404 };
    }
    return { data, status: 200 };
  },
  getDB(request:Request){
    return getSupabase(request).supabase;
  }
};

export default dbService;
