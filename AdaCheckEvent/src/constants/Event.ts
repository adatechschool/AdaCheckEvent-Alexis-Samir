export type Event = {
  // identifiant unique de l'événement
  id: string;

  // titre et description
  title: string; // Nom de l'événement
  description: string; // Description de l'événement
  lead_texte: string; // Petite description
  qfap_tags?: string[] | null; // Tags QFAP associés à l'événement

  // image de l'événement
  cover_url: string; // URL de l'image de couverture de l'événement
  cover_alt: string; // Texte alternatif pour l'image de couverture

  // dates
  date_start: string | null; // Date de début de l'événement
  date_end: string | null; // Date de fin de l'événement
  date_description?: string | null; // Description des dates (ex: "Tous les jours de 10h à 18h")

  // lieu et coordonnées
  address_name: string | null; // Nom du lieu de l'événement
  address_street: string | null; // Lieu de l'événement
  address_zipcode: string | null; // Code postal du lieu de l'événement
  address_city: string | null; // Ville du lieu de l'événement
  text: string | null;  // Dans le cas où l'adresse n'est pas indiquée 
  lat_lon: [number | null, number | null] | null; // Coordonnées géographiques de l'événement

  // contact et accès
  contact_url: string | null; // URL de contact pour l'événement
  contact_phone: string | null; // Numéro de téléphone de contact pour l'événement
  contact_mail: string | null; // Adresse e-mail de contact pour l'événement

  // lien d'accès
  access_link: string; // Lien d'accès à l'événement pour reservation ou informations
  access_link_text: string; // Texte du lien d'accès à l'événement
  url: string; // lien URL de l'événement sur le site de Paris

  // Accessibilité
  blind: boolean | null;
  pmr: boolean | null;
  deaf: boolean | null;
  sign_language: boolean | null;
  mental: boolean | null;

  // Prix
  price_type: number | null;
  price_detail: string | null;
}

export type APIResponse = {
  id: string;
  url: string;
  title: string;
  lead_text: string;
  description: string;
  date_start: string;
  date_end: string;
  occurrences: string | null;
  date_description: string;
  cover_url: string;
  cover_alt: string;
  cover_credit: string;
  locations: Array<{
    accessibility?: {
      blind?: number;
      pmr?: number;
      deaf?: number;
      sign_language?: number;
      mental?: number | null;
    };
    address_street?: string;
    address_zipCode?: string;
    address_details?: string;
    address_name?: string;
    address_lat_lon?: string;
    location_type?: string;
    address_city?: string;
    text?: string;
  }>;
  address_name: string;
  address_street: string;
  address_zipcode: string;
  address_city: string;
  lat_lon: {
    lon: number;
    lat: number;
  };
  pmr: number | null;
  blind: number | null;
  deaf: number | null;
  sign_language: string | null;
  mental: number | null;
  transport: string | null;
  contact_url: string | null;
  contact_phone: string | null;
  contact_mail: string | null;
  contact_facebook: string | null;
  contact_twitter: string | null;
  price_type: string;
  price_detail: string;
  access_type: string;
  access_link: string;
  access_link_text: string;
  updated_at: string;
  image_couverture: string | null;
  programs: string | null;
  address_url: string | null;
  address_url_text: string | null;
  address_text: string | null;
  title_event: string;
  audience: string;
  childrens: string | null;
  group: string;
  locale: string;
  rank: number;
  weight: number;
  qfap_tags: string;
  universe_tags: string | null;
  event_indoor: number;
  event_pets_allowed: number;
  contact_organisation_name: string | null;
  contact_url_text: string | null;
  contact_vimeo: string | null;
  contact_deezer: string | null;
  contact_tiktok: string | null;
  contact_twitch: string | null;
  contact_spotify: string | null;
  contact_youtube: string | null;
  contact_bandcamp: string | null;
  contact_linkedin: string | null;
  contact_snapchat: string | null;
  contact_whatsapp: string | null;
  contact_instagram: string | null;
  contact_messenger: string | null;
  contact_pinterest: string | null;
  contact_soundcloud: string | null;
  univers: string | null;
}