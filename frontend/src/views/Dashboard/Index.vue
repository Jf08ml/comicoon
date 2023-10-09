<template>
  <div class="dashboard">
    <div class="sidebar">
      <ul>
        <li
          @click="activeSection = 'user-permissions'"
          :class="{ active: activeSection === 'user-permissions' }"
        >
          ▸ Administrar permisos de usuarios
        </li>
        <li
          @click="activeSection = 'publication-requests'"
          :class="{ active: activeSection === 'publication-requests' }"
        >
          ▸ Solicitudes de publicación
        </li>
        <li
          @click="activeSection = 'payment-requests'"
          :class="{ active: activeSection === 'payment-requests' }"
        >
          ▸ Solicitudes de pagos
        </li>
      </ul>
    </div>
    <div class="content-section">
      <div v-if="activeSection === 'user-permissions'" class="section">
        <!-- Contenido para Administrar permisos de usuarios -->
      </div>
      <div v-if="activeSection === 'publication-requests'" class="section">
        <!-- Contenido para Solicitudes de publicación -->
      </div>
      <div v-if="activeSection === 'payment-requests'" class="section">
        <!-- Contenido para Solicitudes de pagos -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const activeSection = ref("user-permissions");
</script>

<style lang="scss">
.dashboard {
  display: flex;
  height: 100vh;
  color: #fff;

  .sidebar {
    width: 250px;
    background-color: #da2644;
    padding: 20px;
    border-top: 3px solid black;

    ul {
      list-style-type: none;
      padding: 0;

      li {
        cursor: pointer;
        margin-bottom: 20px;
        padding: 10px;
        border-radius: 5px;
        transition: background-color 0.3s ease;

        &:hover {
          background-color: darken(#da2644, 10%);
        }
      }
    }
  }

  .content-section {
    flex-grow: 1;
    background-color: #f4f4f4;
    padding: 20px;
    border-top: 3px solid black;

    .section {
      background-color: #fff;
      border-radius: 5px;
      padding: 20px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
  }

  .active {
    background-color: darken(#da2644, 10%);
  }

  @media (max-width: 768px) {
    flex-direction: column;

    .sidebar {
      width: 100%;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: space-around;

      ul {
        display: flex;
        width: 100%;
        justify-content: space-around;

        li {
          margin-bottom: 0;
          font-size: 12px;
          text-align: center;
        }
      }
    }

    .content {
      width: 100%;
      height: calc(100vh - 150px);
      overflow-y: auto;
    }
  }
}
</style>
