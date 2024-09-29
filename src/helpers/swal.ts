import Swal from "sweetalert2";

export const swalWarnOption = (msg?: string) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",
      text: msg || "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error",
        });
      }
    });
};

export const handleSuccess = (msg?: string) => {
  Swal.fire({
    text: msg,
    icon: "success",
    confirmButtonText: "OK",
  });
};

export const handleError = (msg?: string) => {
  Swal.fire({
    title: "Oops!",
    text: msg,
    icon: "error",
    confirmButtonText: "Try Again",
  });
};
export const handleWarn = (msg?: string) => {
  Swal.fire({
    title: "Warning!",
    text: msg || "This action might have consequences!",
    icon: "warning",
    confirmButtonText: "OK",
  });
};
