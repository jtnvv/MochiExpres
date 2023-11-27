import Swal from "sweetalert2";

export const mensajeInformación = (mensaje) => {
    Swal.fire({
        title: "Información",
        text: {mensaje},
        icon: "info"
    });
};

export const mensajeExito = (mensaje) => {
    Swal.fire({
        title: "Confirmación",
        text: {mensaje},
        icon: "success"
    }).then (() => {
        window.location.reload();
    });
};

export const mensajeAdvertencia = (mensaje) => {
    Swal.fire({
        title: "Advertencia",
        text: {mensaje},
        icon: "warning"
    });
};

export const mensajeError = (mensaje) => {
    Swal.fire({
        title: "Error",
        text: {mensaje},
        icon: "error"
    });
};

export const mensajeConfirmacionEliminacion = (objeto) => {
    Swal.fire({
        title: "¿Está seguro de eliminar?",
        text: "Esta acción no se puede revertir",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#55d6c2",
        cancelButtonColor: "#f49097",
        confirmButtonText: "Si, ¡eliminar!",
        cancelButtonText: "No, ¡cancelar!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "¡Eliminado!",
            text: `${objeto} ha sido eliminado.`,
            icon: "success"
          }).then(() => {
              window.location.reload();
          });
        }
      });
}