export default function getUrlControllerApi(controllerName: string){
    const baseLink = window.location.origin.toLowerCase();

    return `${baseLink}/api/${controllerName}`
}