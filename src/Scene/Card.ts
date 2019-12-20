class Card extends eui.Component implements eui.UIComponent {

	public num: number;
	public label: eui.Label;
	public image: eui.Image;

	public constructor(num: number) {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	protected childrenCreated(): void {
		super.childrenCreated();
	}

	public setNum(num:number){
		this.num = num;
		this.label.text = num.toString();
	}

	public highlight(): void {
		this.image.source = 'blueCard_png';
		this.label.textColor = 0xFFFFFF;
	}

	public highlightOff(): void {
		this.image.source = 'card_png';
		this.label.textColor = 0x606A70;
	}
}