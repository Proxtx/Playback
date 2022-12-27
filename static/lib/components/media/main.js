export class Component {
  constructor(options) {
    this.document = options.shadowDom;
    this.img = this.document.getElementById("img");
    this.video = this.document.getElementById("video");
    this.text = this.document.getElementById("text");
  }

  display(mediaOptions) {
    if (!mediaOptions || mediaOptions.length == 0) {
      this.video.style.display = "none";
      this.img.style.display = "none";
      this.text.style.display = "none";
      return;
    }
    mediaOptions = mediaOptions[0];
    let src = `data:${mediaOptions.type};base64,${mediaOptions.buffer}`;
    if (mediaOptions.type.split("/")[0] == "image") {
      this.video.style.display = "none";
      this.img.style.display = "unset";
      this.text.style.display = "none";
      this.img.src = src;
    } else if (mediaOptions.type.split("/")[0] == "text") {
      console.log(this.text);
      this.video.style.display = "none";
      this.img.style.display = "none";
      this.text.style.display = "unset";
      this.text.innerText = mediaOptions.text;
    } else {
      this.video.style.display = "unset";
      this.img.style.display = "none";
      this.text.style.display = "none";
      this.video.src = src;
    }
  }
}
