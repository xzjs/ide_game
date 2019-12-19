class Dialog extends eui.Component implements eui.UIComponent {
	public scripts: string[];
	public index: number;
	public nextBtn: eui.Button;
	public scriptLabel: eui.Label;

	public constructor() {
		super();
		this.index = 0;
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		this.nextBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.nextBtnHandler, this);
	}

	public setScripts(_scripts: string[]) {
		this.scripts = _scripts;
		this.scriptLabel.text = _scripts[0];
	}

	public nextBtnHandler(event: egret.TouchEvent): void {
		if (this.index++ < this.scripts.length - 1) {
			this.scriptLabel.text = this.scripts[this.index];
		} else {
			this.visible = false;
		}
	}
}