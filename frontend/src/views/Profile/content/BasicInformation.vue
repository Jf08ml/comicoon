<template>
  <div class="basic-information">
    <!-- Foto de perfil -->
    <div class="profile-picture">
      <img :src="profilePicture" alt="Profile Picture" />
      <input
        type="file"
        @change="handleProfilePictureChange"
        accept="image/*"
      />
    </div>

    <h4>Change your profile photo, username, email and password</h4>
    <!-- Formulario de edición de información -->
    <form @submit.prevent="saveChanges">
      <input
        placeholder="Username"
        type="text"
        id="username"
        v-model="userData.username"
        required
      />

      <input
        placeholder="Email"
        type="email"
        id="email"
        v-model="userData.email"
        required
      />

      <input
        placeholder="Current password"
        type="password"
        id="password"
        v-model="userData.password"
        required
      />

      <input
        placeholder="New password"
        type="password"
        id="password"
        v-model="userData.password"
        required
      />

      <button type="submit" class="button-primary">Save Changes</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Datos del usuario (simulados)
const userData = ref({});

// Foto de perfil (simulada)
const profilePicture = ref("https://i.ibb.co/R6JfVWG/Fp-TSq7-Ga-YAAWho8.jpg");

// Manejar el cambio de la foto de perfil
const handleProfilePictureChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    // Simplemente actualiza la variable profilePicture con la URL de la nueva imagen
    const reader = new FileReader();
    reader.onload = (e) => {
      profilePicture.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

// Guardar los cambios en la información del usuario
const saveChanges = () => {
  // Aquí podrías enviar los datos del formulario al servidor o hacer cualquier otro tipo de manejo de datos necesario.
  console.log("Datos del usuario actualizados:", userData.value);
};
</script>

<style scoped>
.basic-information {
  padding: 20px;
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.profile-picture {
  text-align: center;
  margin-bottom: 20px;
}

.profile-picture img {
  max-width: 200px;
  max-height: 200px;
  border-radius: 50%;
  box-shadow: 0 0 1px black;
  object-fit: cover;
}

.profile-picture input[type="file"] {
  display: none;
}

form {
  width: 50%;
}

form button {
  width: 30%;
}

@media screen and (max-width: 800px) {
  form {
    width: 100%;
  }

  form button {
    width: 50%;
  }
}
</style>
