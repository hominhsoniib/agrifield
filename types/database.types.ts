export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      attachments: {
        Row: {
          created_at: string | null
          entity_id: string
          entity_type: string
          id: string
          storage_path: string
          uploaded_by: string | null
        }
        Insert: {
          created_at?: string | null
          entity_id: string
          entity_type: string
          id?: string
          storage_path: string
          uploaded_by?: string | null
        }
        Update: {
          created_at?: string | null
          entity_id?: string
          entity_type?: string
          id?: string
          storage_path?: string
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "attachments_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      crops: {
        Row: {
          code: string | null
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          code?: string | null
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          code?: string | null
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      expenses: {
        Row: {
          amount: number
          category: Database["public"]["Enums"]["expense_category"]
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          expense_date: string
          farm_id: string | null
          growing_area_id: string | null
          id: string
          notes: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          category: Database["public"]["Enums"]["expense_category"]
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          expense_date?: string
          farm_id?: string | null
          growing_area_id?: string | null
          id?: string
          notes?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          category?: Database["public"]["Enums"]["expense_category"]
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          expense_date?: string
          farm_id?: string | null
          growing_area_id?: string | null
          id?: string
          notes?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "expenses_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_growing_area_id_fkey"
            columns: ["growing_area_id"]
            isOneToOne: false
            referencedRelation: "growing_areas"
            referencedColumns: ["id"]
          },
        ]
      }
      farm_activities: {
        Row: {
          activity_date: string
          activity_type: Database["public"]["Enums"]["activity_type"]
          cost: number | null
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          farm_id: string | null
          growing_area_id: string | null
          id: string
          material_used: string | null
          notes: string | null
          performed_by: string | null
          updated_at: string | null
        }
        Insert: {
          activity_date?: string
          activity_type: Database["public"]["Enums"]["activity_type"]
          cost?: number | null
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          farm_id?: string | null
          growing_area_id?: string | null
          id?: string
          material_used?: string | null
          notes?: string | null
          performed_by?: string | null
          updated_at?: string | null
        }
        Update: {
          activity_date?: string
          activity_type?: Database["public"]["Enums"]["activity_type"]
          cost?: number | null
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          farm_id?: string | null
          growing_area_id?: string | null
          id?: string
          material_used?: string | null
          notes?: string | null
          performed_by?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "farm_activities_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "farm_activities_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "farm_activities_growing_area_id_fkey"
            columns: ["growing_area_id"]
            isOneToOne: false
            referencedRelation: "growing_areas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "farm_activities_performed_by_fkey"
            columns: ["performed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      farms: {
        Row: {
          address: string | null
          code: string | null
          created_at: string | null
          created_by: string | null
          gps_lat: number | null
          gps_lng: number | null
          id: string
          is_active: boolean | null
          manager_id: string | null
          name: string
          organization_id: string | null
          total_area_ha: number | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          code?: string | null
          created_at?: string | null
          created_by?: string | null
          gps_lat?: number | null
          gps_lng?: number | null
          id?: string
          is_active?: boolean | null
          manager_id?: string | null
          name: string
          organization_id?: string | null
          total_area_ha?: number | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          code?: string | null
          created_at?: string | null
          created_by?: string | null
          gps_lat?: number | null
          gps_lng?: number | null
          id?: string
          is_active?: boolean | null
          manager_id?: string | null
          name?: string
          organization_id?: string | null
          total_area_ha?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "farms_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "farms_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "farms_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      fertilizer_applications: {
        Row: {
          application_date: string
          application_method: string | null
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          dosage: number | null
          dosage_unit: string | null
          farm_id: string | null
          fertilizer_product_id: string | null
          growing_area_id: string | null
          id: string
          notes: string | null
          performed_by: string | null
          total_quantity: number | null
          updated_at: string | null
        }
        Insert: {
          application_date?: string
          application_method?: string | null
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          dosage?: number | null
          dosage_unit?: string | null
          farm_id?: string | null
          fertilizer_product_id?: string | null
          growing_area_id?: string | null
          id?: string
          notes?: string | null
          performed_by?: string | null
          total_quantity?: number | null
          updated_at?: string | null
        }
        Update: {
          application_date?: string
          application_method?: string | null
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          dosage?: number | null
          dosage_unit?: string | null
          farm_id?: string | null
          fertilizer_product_id?: string | null
          growing_area_id?: string | null
          id?: string
          notes?: string | null
          performed_by?: string | null
          total_quantity?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fertilizer_applications_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fertilizer_applications_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fertilizer_applications_fertilizer_product_id_fkey"
            columns: ["fertilizer_product_id"]
            isOneToOne: false
            referencedRelation: "fertilizer_products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fertilizer_applications_growing_area_id_fkey"
            columns: ["growing_area_id"]
            isOneToOne: false
            referencedRelation: "growing_areas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fertilizer_applications_performed_by_fkey"
            columns: ["performed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      fertilizer_products: {
        Row: {
          brand: string | null
          created_at: string | null
          fertilizer_group: string | null
          id: string
          is_active: boolean | null
          name: string
          notes: string | null
          nutrient_composition: string | null
          supplier: string | null
          unit: string
        }
        Insert: {
          brand?: string | null
          created_at?: string | null
          fertilizer_group?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          notes?: string | null
          nutrient_composition?: string | null
          supplier?: string | null
          unit: string
        }
        Update: {
          brand?: string | null
          created_at?: string | null
          fertilizer_group?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          notes?: string | null
          nutrient_composition?: string | null
          supplier?: string | null
          unit?: string
        }
        Relationships: []
      }
      growing_areas: {
        Row: {
          area_ha: number | null
          code: string
          created_at: string | null
          created_by: string | null
          crop_id: string | null
          deleted_at: string | null
          farm_id: string | null
          gps_lat: number | null
          gps_lng: number | null
          id: string
          notes: string | null
          planting_density: string | null
          planting_year: number | null
          status: string | null
          updated_at: string | null
          variety: string | null
        }
        Insert: {
          area_ha?: number | null
          code: string
          created_at?: string | null
          created_by?: string | null
          crop_id?: string | null
          deleted_at?: string | null
          farm_id?: string | null
          gps_lat?: number | null
          gps_lng?: number | null
          id?: string
          notes?: string | null
          planting_density?: string | null
          planting_year?: number | null
          status?: string | null
          updated_at?: string | null
          variety?: string | null
        }
        Update: {
          area_ha?: number | null
          code?: string
          created_at?: string | null
          created_by?: string | null
          crop_id?: string | null
          deleted_at?: string | null
          farm_id?: string | null
          gps_lat?: number | null
          gps_lng?: number | null
          id?: string
          notes?: string | null
          planting_density?: string | null
          planting_year?: number | null
          status?: string | null
          updated_at?: string | null
          variety?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "growing_areas_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "growing_areas_crop_id_fkey"
            columns: ["crop_id"]
            isOneToOne: false
            referencedRelation: "crops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "growing_areas_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
        ]
      }
      inventory_items: {
        Row: {
          category: string | null
          code: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          name: string
          notes: string | null
          reference_price: number | null
          supplier: string | null
          unit: string
        }
        Insert: {
          category?: string | null
          code?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          notes?: string | null
          reference_price?: number | null
          supplier?: string | null
          unit: string
        }
        Update: {
          category?: string | null
          code?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          notes?: string | null
          reference_price?: number | null
          supplier?: string | null
          unit?: string
        }
        Relationships: []
      }
      organizations: {
        Row: {
          address: string | null
          code: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          name: string
          phone: string | null
          representative_name: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          code?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          phone?: string | null
          representative_name?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          code?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          phone?: string | null
          representative_name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          full_name: string
          id: string
          is_active: boolean | null
          organization_id: string | null
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          full_name: string
          id: string
          is_active?: boolean | null
          organization_id?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          full_name?: string
          id?: string
          is_active?: boolean | null
          organization_id?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      user_farms: {
        Row: {
          created_at: string | null
          farm_id: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          farm_id?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          farm_id?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_farms_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_farms_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_farm_access: { Args: { target_farm_id: string }; Returns: boolean }
      is_admin_role: { Args: never; Returns: boolean }
    }
    Enums: {
      activity_type:
        | "irrigation"
        | "weeding"
        | "pruning"
        | "pest_control"
        | "fertilizing"
        | "pesticide"
        | "other"
      expense_category:
        | "fertilizer"
        | "labor"
        | "irrigation"
        | "materials"
        | "other"
      user_role:
        | "admin"
        | "org_admin"
        | "farm_manager"
        | "field_technician"
        | "farmer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      activity_type: [
        "irrigation",
        "weeding",
        "pruning",
        "pest_control",
        "fertilizing",
        "pesticide",
        "other",
      ],
      expense_category: [
        "fertilizer",
        "labor",
        "irrigation",
        "materials",
        "other",
      ],
      user_role: [
        "admin",
        "org_admin",
        "farm_manager",
        "field_technician",
        "farmer",
      ],
    },
  },
} as const
