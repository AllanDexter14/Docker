<h1 align="center">PSU-Sphere</h1>

<p align="center">
  <b>Student Organization & Campus Management Portal</b><br>
  Developed by Allan Dexter P. Cuizion and Jhon Grover Longsud <br>
  BS in Computer Science 3rd Year Block 1 at Palawan State University
</p>

---

## Project Name
**PSU-Sphere**

---

## Short Description
PSU-Sphere is a Django-based web application tailored for Palawan State University to manage student organizations, colleges, academic programs, students, and organization memberships. It provides an organized, centralized system to store and manage campus entities directly through a customized Django admin interface.

---

## List of Features
* **Academic Unit Management:** Manage colleges and their corresponding degree programs.
* **Student Information Directory:** Store student profiles complete with student IDs, full names, and assigned academic programs.
* **Organizations & Membership Tracking:** Manage student organizations and record active memberships along with the exact date a student joined.
* **Customized Admin Panel:** Search students by last name and first name, filter records by college, and view a student's academic program directly within membership listings.
* **Automated Data Seeding:** Generate sample records using the `Faker` library for rapid testing and development.

---

## Authors

<table>
  <tr>
    <td align="center" width="50%">
      <img src="https://github.com/AllanDexter14.png" width="150" style="border-radius: 50%;" alt="Allan Dexter P. Cuizon"><br />
      <br />
      <b>Name:</b> Allan Dexter P. Cuizon<br />
      <b>Email:</b> 202480112@psu.palawan.edu.ph<br /><br />
      <a href="https://github.com/AllanDexter14">
        <img src="https://raw.githubusercontent.com/gauravghongde/social-icons/master/PNG/Color/Github.png" width="30" height="30" alt="GitHub">
      </a>
      <a href="https://www.facebook.com/allandexter.cuizon">
        <img src="https://raw.githubusercontent.com/gauravghongde/social-icons/master/PNG/Color/Facebook.png" width="30" height="30" alt="Facebook">
      </a>
    </td>
    <td align="center" width="50%">
      <img src="https://github.com/Boben19.png" width="150" style="border-radius: 50%;" alt="Jhon Grover Longsud"><br />
      <br />
      <b>Name:</b> Jhon Grover Longsud<br />
      <b>Email:</b> jhongroverlongsud2005@gmail.com<br /><br />
      <a href="https://github.com/Boben19">
        <img src="https://raw.githubusercontent.com/gauravghongde/social-icons/master/PNG/Color/Github.png" width="30" height="30" alt="GitHub">
      </a>
      <a href="https://www.facebook.com/jhongroverlongsud19/">
        <img src="https://raw.githubusercontent.com/gauravghongde/social-icons/master/PNG/Color/Facebook.png" width="30" height="30" alt="Facebook">
      </a>
    </td>
  </tr>
</table>

---

### 📬 Project Repository
Check out the source code and updates here:  
👉 [PSU-Sphere Repository](https://github.com/AllanDexter14/PSU-Sphere)

---

## Running with Docker

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop) installed and running

### Option A: Build from source (developers)
```bash
git clone <this-repo-url>
cd <repo-folder>
docker compose up -d --build
```
Open http://localhost:8000

### Option B: Run the prebuilt image from Docker Hub (client)
The image is at `boben19/django-app:latest`.
```bash
cd for_client
docker compose up -d
```
Open http://localhost:8000

### First-time setup
```bash
docker compose exec web python manage.py createsuperuser
```

### Useful commands
```bash
docker compose ps          # check status
docker compose logs -f web # view logs
docker compose down        # stop and remove containers
```

> Note: open **http://localhost:8000**, not `http://0.0.0.0:8000`.

### Social login (optional)
Copy `.env.example` to `.env` (next to `docker-compose.yml`) and fill in your own Google / GitHub OAuth credentials, then run `docker compose up -d --force-recreate`.
Callback URLs: `http://localhost:8000/accounts/google/login/callback/` and `http://localhost:8000/accounts/github/login/callback/`.
Without these, username/password login still works.
