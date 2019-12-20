class Dialog extends eui.Component implements eui.UIComponent {
	public label: eui.Label;
	public image: eui.Image;
	public button: eui.Image;
	public images = {
		'code_png': [291, 68],
		'block_png': [364, 256]
	}


	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
	}

	public setText(text: string, src: string = '') {
		this.label.text = text;
		if (src) {
			this.image.source = src;
			this.image.width = this.images[src][0];
			this.image.height = this.images[src][1];
		} else {
			this.image.source = '';
		}
	}
}