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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      audit_logs: {
        Row: {
          action: string
          created_at: string | null
          id: string
          ip_address: unknown | null
          new_values: Json | null
          old_values: Json | null
          record_id: string | null
          table_name: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      company_profiles: {
        Row: {
          annual_revenue_range: string | null
          certifications: Json | null
          company_name: string
          created_at: string
          description: string | null
          employee_count: number | null
          id: string
          industry_sector: string | null
          registration_number: string | null
          updated_at: string
          user_id: string
          vat_number: string | null
          verification_documents: Json | null
          verification_status: Database["public"]["Enums"]["verification_status"]
          website_url: string | null
        }
        Insert: {
          annual_revenue_range?: string | null
          certifications?: Json | null
          company_name: string
          created_at?: string
          description?: string | null
          employee_count?: number | null
          id?: string
          industry_sector?: string | null
          registration_number?: string | null
          updated_at?: string
          user_id: string
          vat_number?: string | null
          verification_documents?: Json | null
          verification_status?: Database["public"]["Enums"]["verification_status"]
          website_url?: string | null
        }
        Update: {
          annual_revenue_range?: string | null
          certifications?: Json | null
          company_name?: string
          created_at?: string
          description?: string | null
          employee_count?: number | null
          id?: string
          industry_sector?: string | null
          registration_number?: string | null
          updated_at?: string
          user_id?: string
          vat_number?: string | null
          verification_documents?: Json | null
          verification_status?: Database["public"]["Enums"]["verification_status"]
          website_url?: string | null
        }
        Relationships: []
      }
      company_verification_documents: {
        Row: {
          company_profile_id: string
          created_at: string | null
          document_name: string
          document_type: string
          document_url: string
          expiry_date: string | null
          id: string
          rejection_reason: string | null
          updated_at: string | null
          upload_date: string | null
          verification_status: string | null
        }
        Insert: {
          company_profile_id: string
          created_at?: string | null
          document_name: string
          document_type: string
          document_url: string
          expiry_date?: string | null
          id?: string
          rejection_reason?: string | null
          updated_at?: string | null
          upload_date?: string | null
          verification_status?: string | null
        }
        Update: {
          company_profile_id?: string
          created_at?: string | null
          document_name?: string
          document_type?: string
          document_url?: string
          expiry_date?: string | null
          id?: string
          rejection_reason?: string | null
          updated_at?: string | null
          upload_date?: string | null
          verification_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_verification_documents_company_profile_id_fkey"
            columns: ["company_profile_id"]
            isOneToOne: false
            referencedRelation: "company_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      message_threads: {
        Row: {
          created_at: string
          id: string
          last_message_at: string
          participants: Json
          related_listing_id: string | null
          subject: string | null
          thread_status: Database["public"]["Enums"]["thread_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          last_message_at?: string
          participants: Json
          related_listing_id?: string | null
          subject?: string | null
          thread_status?: Database["public"]["Enums"]["thread_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          last_message_at?: string
          participants?: Json
          related_listing_id?: string | null
          subject?: string | null
          thread_status?: Database["public"]["Enums"]["thread_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_threads_related_listing_id_fkey"
            columns: ["related_listing_id"]
            isOneToOne: false
            referencedRelation: "product_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          attachments: Json | null
          id: string
          listing_id: string | null
          message_content: string
          message_type: Database["public"]["Enums"]["message_type"]
          read_status: boolean
          recipient_id: string
          sender_id: string
          sent_at: string
          subject: string | null
          thread_id: string
        }
        Insert: {
          attachments?: Json | null
          id?: string
          listing_id?: string | null
          message_content: string
          message_type?: Database["public"]["Enums"]["message_type"]
          read_status?: boolean
          recipient_id: string
          sender_id: string
          sent_at?: string
          subject?: string | null
          thread_id: string
        }
        Update: {
          attachments?: Json | null
          id?: string
          listing_id?: string | null
          message_content?: string
          message_type?: Database["public"]["Enums"]["message_type"]
          read_status?: boolean
          recipient_id?: string
          sender_id?: string
          sent_at?: string
          subject?: string | null
          thread_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "product_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "message_threads"
            referencedColumns: ["id"]
          },
        ]
      }
      product_listings: {
        Row: {
          created_at: string
          description: string | null
          id: string
          images: Json | null
          inquiries_count: number
          listing_status: Database["public"]["Enums"]["listing_status"]
          location_country: string | null
          location_region: string | null
          powder_condition: Database["public"]["Enums"]["powder_condition"]
          price_per_kg: number
          quantity_kg: number
          seller_id: string
          title: string
          total_price: number | null
          updated_at: string
          views_count: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          images?: Json | null
          inquiries_count?: number
          listing_status?: Database["public"]["Enums"]["listing_status"]
          location_country?: string | null
          location_region?: string | null
          powder_condition: Database["public"]["Enums"]["powder_condition"]
          price_per_kg: number
          quantity_kg: number
          seller_id: string
          title: string
          total_price?: number | null
          updated_at?: string
          views_count?: number
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          images?: Json | null
          inquiries_count?: number
          listing_status?: Database["public"]["Enums"]["listing_status"]
          location_country?: string | null
          location_region?: string | null
          powder_condition?: Database["public"]["Enums"]["powder_condition"]
          price_per_kg?: number
          quantity_kg?: number
          seller_id?: string
          title?: string
          total_price?: number | null
          updated_at?: string
          views_count?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          account_status: Database["public"]["Enums"]["account_status"]
          bio_description: string | null
          contact_visibility: string | null
          created_at: string
          department: string | null
          email_verified: boolean
          first_name: string
          id: string
          job_title: string | null
          last_login: string | null
          last_name: string
          last_profile_update: string | null
          phone_number: string | null
          phone_verified: boolean | null
          preferred_contact_method: string | null
          primary_phone: string | null
          profile_picture_url: string | null
          profile_visibility: string | null
          secondary_email: string | null
          secondary_phone: string | null
          show_online_status: boolean | null
          spelling_preference: string | null
          updated_at: string
          user_id: string
          user_role: Database["public"]["Enums"]["app_role"]
        }
        Insert: {
          account_status?: Database["public"]["Enums"]["account_status"]
          bio_description?: string | null
          contact_visibility?: string | null
          created_at?: string
          department?: string | null
          email_verified?: boolean
          first_name: string
          id?: string
          job_title?: string | null
          last_login?: string | null
          last_name: string
          last_profile_update?: string | null
          phone_number?: string | null
          phone_verified?: boolean | null
          preferred_contact_method?: string | null
          primary_phone?: string | null
          profile_picture_url?: string | null
          profile_visibility?: string | null
          secondary_email?: string | null
          secondary_phone?: string | null
          show_online_status?: boolean | null
          spelling_preference?: string | null
          updated_at?: string
          user_id: string
          user_role?: Database["public"]["Enums"]["app_role"]
        }
        Update: {
          account_status?: Database["public"]["Enums"]["account_status"]
          bio_description?: string | null
          contact_visibility?: string | null
          created_at?: string
          department?: string | null
          email_verified?: boolean
          first_name?: string
          id?: string
          job_title?: string | null
          last_login?: string | null
          last_name?: string
          last_profile_update?: string | null
          phone_number?: string | null
          phone_verified?: boolean | null
          preferred_contact_method?: string | null
          primary_phone?: string | null
          profile_picture_url?: string | null
          profile_visibility?: string | null
          secondary_email?: string | null
          secondary_phone?: string | null
          show_online_status?: boolean | null
          spelling_preference?: string | null
          updated_at?: string
          user_id?: string
          user_role?: Database["public"]["Enums"]["app_role"]
        }
        Relationships: []
      }
      quality_certifications: {
        Row: {
          certificate_number: string | null
          certification_type: Database["public"]["Enums"]["certification_type"]
          created_at: string
          document_url: string | null
          expiry_date: string | null
          id: string
          issue_date: string | null
          issuing_authority: string | null
          listing_id: string
          updated_at: string
          verification_status: Database["public"]["Enums"]["verification_status"]
        }
        Insert: {
          certificate_number?: string | null
          certification_type: Database["public"]["Enums"]["certification_type"]
          created_at?: string
          document_url?: string | null
          expiry_date?: string | null
          id?: string
          issue_date?: string | null
          issuing_authority?: string | null
          listing_id: string
          updated_at?: string
          verification_status?: Database["public"]["Enums"]["verification_status"]
        }
        Update: {
          certificate_number?: string | null
          certification_type?: Database["public"]["Enums"]["certification_type"]
          created_at?: string
          document_url?: string | null
          expiry_date?: string | null
          id?: string
          issue_date?: string | null
          issuing_authority?: string | null
          listing_id?: string
          updated_at?: string
          verification_status?: Database["public"]["Enums"]["verification_status"]
        }
        Relationships: [
          {
            foreignKeyName: "quality_certifications_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "product_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_searches: {
        Row: {
          alert_enabled: boolean
          created_at: string
          id: string
          last_run: string | null
          search_name: string
          search_parameters: Json
          updated_at: string
          user_id: string
        }
        Insert: {
          alert_enabled?: boolean
          created_at?: string
          id?: string
          last_run?: string | null
          search_name: string
          search_parameters: Json
          updated_at?: string
          user_id: string
        }
        Update: {
          alert_enabled?: boolean
          created_at?: string
          id?: string
          last_run?: string | null
          search_name?: string
          search_parameters?: Json
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      team_members: {
        Row: {
          company_profile_id: string
          created_at: string | null
          id: string
          invitation_date: string | null
          invitation_email: string
          invited_by_user_id: string
          joined_date: string | null
          permissions: Json | null
          role: string
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          company_profile_id: string
          created_at?: string | null
          id?: string
          invitation_date?: string | null
          invitation_email: string
          invited_by_user_id: string
          joined_date?: string | null
          permissions?: Json | null
          role: string
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          company_profile_id?: string
          created_at?: string | null
          id?: string
          invitation_date?: string | null
          invitation_email?: string
          invited_by_user_id?: string
          joined_date?: string | null
          permissions?: Json | null
          role?: string
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "team_members_company_profile_id_fkey"
            columns: ["company_profile_id"]
            isOneToOne: false
            referencedRelation: "company_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ti64_specifications: {
        Row: {
          apparent_density: number | null
          carbon_content_ppm: number | null
          created_at: string
          d10_microns: number | null
          d50_microns: number | null
          d90_microns: number | null
          flowability_rating: string | null
          hydrogen_content_ppm: number | null
          id: string
          listing_id: string
          manufacturing_method:
            | Database["public"]["Enums"]["manufacturing_method"]
            | null
          moisture_content: number | null
          nitrogen_content_ppm: number | null
          oxygen_content_ppm: number | null
          particle_size_range: string | null
          previous_use_cycles: number | null
          shelf_life_remaining: string | null
          storage_conditions: string | null
          tap_density: number | null
          updated_at: string
        }
        Insert: {
          apparent_density?: number | null
          carbon_content_ppm?: number | null
          created_at?: string
          d10_microns?: number | null
          d50_microns?: number | null
          d90_microns?: number | null
          flowability_rating?: string | null
          hydrogen_content_ppm?: number | null
          id?: string
          listing_id: string
          manufacturing_method?:
            | Database["public"]["Enums"]["manufacturing_method"]
            | null
          moisture_content?: number | null
          nitrogen_content_ppm?: number | null
          oxygen_content_ppm?: number | null
          particle_size_range?: string | null
          previous_use_cycles?: number | null
          shelf_life_remaining?: string | null
          storage_conditions?: string | null
          tap_density?: number | null
          updated_at?: string
        }
        Update: {
          apparent_density?: number | null
          carbon_content_ppm?: number | null
          created_at?: string
          d10_microns?: number | null
          d50_microns?: number | null
          d90_microns?: number | null
          flowability_rating?: string | null
          hydrogen_content_ppm?: number | null
          id?: string
          listing_id?: string
          manufacturing_method?:
            | Database["public"]["Enums"]["manufacturing_method"]
            | null
          moisture_content?: number | null
          nitrogen_content_ppm?: number | null
          oxygen_content_ppm?: number | null
          particle_size_range?: string | null
          previous_use_cycles?: number | null
          shelf_life_remaining?: string | null
          storage_conditions?: string | null
          tap_density?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ti64_specifications_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "product_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      user_activity_feed: {
        Row: {
          activity_description: string
          activity_timestamp: string | null
          activity_type: string
          id: string
          is_read: boolean | null
          metadata: Json | null
          related_entity_id: string | null
          related_entity_type: string | null
          user_id: string
        }
        Insert: {
          activity_description: string
          activity_timestamp?: string | null
          activity_type: string
          id?: string
          is_read?: boolean | null
          metadata?: Json | null
          related_entity_id?: string | null
          related_entity_type?: string | null
          user_id: string
        }
        Update: {
          activity_description?: string
          activity_timestamp?: string | null
          activity_type?: string
          id?: string
          is_read?: boolean | null
          metadata?: Json | null
          related_entity_id?: string | null
          related_entity_type?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_addresses: {
        Row: {
          address_line_2: string | null
          address_type: string
          address_verified: boolean | null
          city: string
          country_code: string
          county_state: string | null
          created_at: string | null
          id: string
          is_default: boolean | null
          postal_code: string
          street_address: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          address_line_2?: string | null
          address_type: string
          address_verified?: boolean | null
          city: string
          country_code?: string
          county_state?: string | null
          created_at?: string | null
          id?: string
          is_default?: boolean | null
          postal_code: string
          street_address: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          address_line_2?: string | null
          address_type?: string
          address_verified?: boolean | null
          city?: string
          country_code?: string
          county_state?: string | null
          created_at?: string | null
          id?: string
          is_default?: boolean | null
          postal_code?: string
          street_address?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_analytics_summary: {
        Row: {
          average_response_time_hours: number | null
          created_at: string | null
          id: string
          metric_date: string
          response_rate_percentage: number | null
          revenue_amount: number | null
          total_inquiries_received: number | null
          total_listings_created: number | null
          total_listings_viewed: number | null
          total_logins: number | null
          total_messages_sent: number | null
          total_searches_performed: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          average_response_time_hours?: number | null
          created_at?: string | null
          id?: string
          metric_date: string
          response_rate_percentage?: number | null
          revenue_amount?: number | null
          total_inquiries_received?: number | null
          total_listings_created?: number | null
          total_listings_viewed?: number | null
          total_logins?: number | null
          total_messages_sent?: number | null
          total_searches_performed?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          average_response_time_hours?: number | null
          created_at?: string | null
          id?: string
          metric_date?: string
          response_rate_percentage?: number | null
          revenue_amount?: number | null
          total_inquiries_received?: number | null
          total_listings_created?: number | null
          total_listings_viewed?: number | null
          total_logins?: number | null
          total_messages_sent?: number | null
          total_searches_performed?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_dashboard_metrics: {
        Row: {
          created_at: string | null
          id: string
          is_visible: boolean | null
          last_updated: string | null
          metric_type: string
          metric_value: number
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_visible?: boolean | null
          last_updated?: string | null
          metric_type: string
          metric_value?: number
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_visible?: boolean | null
          last_updated?: string | null
          metric_type?: string
          metric_value?: number
          user_id?: string
        }
        Relationships: []
      }
      user_marketplace_preferences: {
        Row: {
          created_at: string | null
          currency: string | null
          date_format: string | null
          default_search_radius: number | null
          distance_units: string | null
          id: string
          language: string | null
          preferred_particle_size_range: string | null
          preferred_powder_condition: string | null
          price_range_max: number | null
          price_range_min: number | null
          temperature_units: string | null
          timezone: string | null
          updated_at: string | null
          user_id: string
          weight_units: string | null
        }
        Insert: {
          created_at?: string | null
          currency?: string | null
          date_format?: string | null
          default_search_radius?: number | null
          distance_units?: string | null
          id?: string
          language?: string | null
          preferred_particle_size_range?: string | null
          preferred_powder_condition?: string | null
          price_range_max?: number | null
          price_range_min?: number | null
          temperature_units?: string | null
          timezone?: string | null
          updated_at?: string | null
          user_id: string
          weight_units?: string | null
        }
        Update: {
          created_at?: string | null
          currency?: string | null
          date_format?: string | null
          default_search_radius?: number | null
          distance_units?: string | null
          id?: string
          language?: string | null
          preferred_particle_size_range?: string | null
          preferred_powder_condition?: string | null
          price_range_max?: number | null
          price_range_min?: number | null
          temperature_units?: string | null
          timezone?: string | null
          updated_at?: string | null
          user_id?: string
          weight_units?: string | null
        }
        Relationships: []
      }
      user_notification_settings: {
        Row: {
          created_at: string | null
          event_type: string
          frequency: string | null
          id: string
          is_enabled: boolean | null
          notification_type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          event_type: string
          frequency?: string | null
          id?: string
          is_enabled?: boolean | null
          notification_type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          event_type?: string
          frequency?: string | null
          id?: string
          is_enabled?: boolean | null
          notification_type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_current_user_profile: {
        Args: Record<PropertyKey, never>
        Returns: {
          account_status: Database["public"]["Enums"]["account_status"]
          user_id: string
          user_role: Database["public"]["Enums"]["app_role"]
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      initialize_user_metrics: {
        Args: { p_user_id: string }
        Returns: undefined
      }
      log_user_activity: {
        Args: {
          p_activity_type: string
          p_description: string
          p_entity_id?: string
          p_entity_type?: string
          p_metadata?: Json
          p_user_id: string
        }
        Returns: undefined
      }
    }
    Enums: {
      account_status: "active" | "suspended" | "pending"
      app_role:
        | "individual"
        | "company_rep"
        | "verified_supplier"
        | "service_provider"
        | "admin"
      certification_type:
        | "material_certificate"
        | "coa"
        | "astm"
        | "ams"
        | "other"
      listing_status: "active" | "sold" | "suspended"
      manufacturing_method: "gas_atomized" | "plasma_atomized" | "other"
      message_type: "inquiry" | "response" | "general"
      powder_condition: "new" | "used" | "reconditioned"
      thread_status: "active" | "archived" | "closed"
      verification_status: "pending" | "verified" | "rejected"
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
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
      account_status: ["active", "suspended", "pending"],
      app_role: [
        "individual",
        "company_rep",
        "verified_supplier",
        "service_provider",
        "admin",
      ],
      certification_type: [
        "material_certificate",
        "coa",
        "astm",
        "ams",
        "other",
      ],
      listing_status: ["active", "sold", "suspended"],
      manufacturing_method: ["gas_atomized", "plasma_atomized", "other"],
      message_type: ["inquiry", "response", "general"],
      powder_condition: ["new", "used", "reconditioned"],
      thread_status: ["active", "archived", "closed"],
      verification_status: ["pending", "verified", "rejected"],
    },
  },
} as const
