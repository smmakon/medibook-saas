import { API_URL } from "../config/api";
import { getToken } from "../config/storage";

export async function getAdminDashboardStats() {
  const response = await fetch(`${API_URL}/admin/dashboard/stats`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to load admin dashboard stats");
  }

  return data.stats;
}


// GET
export async function getDoctors({
  page = 1,
  search = "",
  limit = 10,
}) {
  const params = new URLSearchParams({
    page,
    search,
    limit,
  });

  const res = await fetch(
    `${API_URL}/admin/doctors?${params}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
}

// CREATE
export async function createDoctor(data) {
  const res = await fetch(
    `${API_URL}/admin/doctors`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(data),
    }
  );

  const json = await res.json();
  if (!res.ok) throw new Error(json.message);

  return json;
}

// UPDATE
export async function updateDoctor(id, data) {
  const res = await fetch(
    `${API_URL}/admin/doctors/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(data),
    }
  );

  const json = await res.json();
  if (!res.ok) throw new Error(json.message);

  return json;
}

// ARCHIVE
export async function archiveDoctor(id) {
  const res = await fetch(
    `${API_URL}/admin/doctors/${id}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },

      body: JSON.stringify({
        status: "INACTIVE",
      }),
    }
  );

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message);
  }

  return json;
}




// GET SPECIALITIES
export async function getSpecialties({
  page = 1,
  search = "",
  limit = 10,
}) {
  const params = new URLSearchParams({
    page,
    search,
    limit,
  });

  const res = await fetch(
    `${API_URL}/admin/specialties?${params}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
}


export async function createSpecialty(data) {
  const res = await fetch(
    `${API_URL}/admin/specialties`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(data),
    }
  );

  const json = await res.json();

  if (!res.ok) {
    throw new Error(
      json.message || "Unable to create specialty"
    );
  }

  return json;
}


export async function updateSpecialty(
  id,
  data
) {
  const res = await fetch(
    `${API_URL}/admin/specialties/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(data),
    }
  );

  const json = await res.json();

  if (!res.ok) {
    throw new Error(
      json.message || "Unable to update specialty"
    );
  }

  return json;
}

export async function archiveSpecialty(id) {
  const res = await fetch(
    `${API_URL}/admin/specialties/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message);
  }

  return json;
}


// Gestion des patients


// GET PATIENTS
export async function getPatients({
    page = 1,
    search = "",
    limit = 10,
}) {
    const params = new URLSearchParams({
        page,
        search,
        limit,
    });

    const res = await fetch(
        `${API_URL}/admin/patients?${params}`,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        }
    );

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    return data;
}
