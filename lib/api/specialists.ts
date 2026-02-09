import { apiClient } from './client';
import { Specialist, Consultation, SpecialistAvailability } from './config';

const normalizeSpecialist = (raw: any): Specialist => ({
  id: Number(raw?.id),
  name: raw?.name ?? '',
  slug: raw?.slug ?? '',
  title: raw?.title ?? '',
  bio: raw?.bio ?? '',
  image: raw?.image ?? '',
  specialties: Array.isArray(raw?.specialties)
    ? raw.specialties
    : raw?.specialty
    ? [raw.specialty]
    : [],
  experience_years: raw?.experience_years ?? 0,
  rating: Number(raw?.rating ?? 0),
  review_count: Number(raw?.reviews_count ?? 0),
  featured: !!(raw?.featured ?? raw?.is_featured),
  availability: Array.isArray(raw?.availability) ? raw.availability : [],
  created_at: raw?.created_at ?? new Date().toISOString(),
  updated_at: raw?.updated_at ?? new Date().toISOString()
});

export class SpecialistService {
  static async getSpecialists(): Promise<Specialist[]> {
    const response = await apiClient.get<{ specialists: Specialist[] }>('/specialists');
    return (response.specialists || []).map(normalizeSpecialist);
  }

  static async getFeaturedSpecialists(): Promise<Specialist[]> {
    const response = await apiClient.get<{ specialists: Specialist[] }>('/specialists/featured');
    return (response.specialists || []).map(normalizeSpecialist);
  }

  static async getSpecialist(slug: string): Promise<Specialist> {
    const response = await apiClient.get<{ specialist: Specialist }>(`/specialists/${slug}`);
    return normalizeSpecialist(response.specialist);
  }

  static async getSpecialistAvailability(specialistSlug: string): Promise<SpecialistAvailability[]> {
    const response = await apiClient.get<{ specialist_id: string; date: string; available_slots: string[] }>(`/specialists/${specialistSlug}/availability`);
    return (response.available_slots || []).map((slot, idx) => ({
      id: idx + 1,
      specialist_id: Number(response.specialist_id),
      date: response.date,
      start_time: slot,
      end_time: '',
      is_available: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }));
  }

  static async bookConsultation(bookingData: {
    specialist_id: number;
    date: string;
    start_time: string;
    end_time: string;
    notes?: string;
  }): Promise<Consultation> {
    const payload = {
      specialist_id: bookingData.specialist_id,
      scheduled_date: bookingData.date,
      scheduled_time: bookingData.start_time,
      customer_notes: bookingData.notes
    };
    const response = await apiClient.post<{ consultation: Consultation }>('/consultations', payload);
    return response.consultation;
  }

  static async getConsultations(): Promise<Consultation[]> {
    const response = await apiClient.get<{ consultations: Consultation[] }>('/consultations');
    return response.consultations || [];
  }

  static async getConsultation(consultationId: number): Promise<Consultation> {
    const response = await apiClient.get<{ consultation: Consultation }>(`/consultations/${consultationId}`);
    return response.consultation;
  }

  static async cancelConsultation(consultationId: number): Promise<Consultation> {
    const response = await apiClient.post<{ consultation: Consultation }>(`/consultations/${consultationId}/cancel`);
    return response.consultation;
  }

  static async rescheduleConsultation(
    consultationId: number,
    rescheduleData: {
      date: string;
      start_time: string;
      end_time: string;
    }
  ): Promise<Consultation> {
    const payload = {
      scheduled_date: rescheduleData.date,
      scheduled_time: rescheduleData.start_time
    };
    const response = await apiClient.post<{ consultation: Consultation }>(`/consultations/${consultationId}/reschedule`, payload);
    return response.consultation;
  }

  static async rateConsultation(
    consultationId: number,
    ratingData: {
      rating: number;
      review?: string;
    }
  ): Promise<Consultation> {
    const response = await apiClient.post<{ consultation: Consultation }>(`/consultations/${consultationId}/rate`, ratingData);
    return response.consultation;
  }
}

