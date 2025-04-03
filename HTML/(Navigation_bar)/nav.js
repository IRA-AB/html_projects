function dropdown() {
    document.getElementById("dd").classList.toggle("show1");
  }
function lights() {
  if (document.getElementById("trafficlight").classList.contains("show3")) {
      document.getElementById("trafficlight").classList.toggle("show3");
    }
    document.getElementById("lights").classList.toggle("show2");
  }
function traffic() {
    if (document.getElementById("lights").classList.contains("show2")) {
        document.getElementById("lights").classList.toggle("show2");
    }
    document.getElementById("trafficlight").classList.toggle("show3");
  }