class Explain extends eui.Component implements eui.UIComponent {
	public label1: eui.Label;
	public label2: eui.Label;

	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
	}

	public setText(num: number) {
		switch (num) {
			case 0:
				this.label1.text = '比较两个数前者是都大于后者';
				this.label2.text = '交换两个数';
				break;
			case 1:
				this.label1.text = 'compare()';
				this.label2.text = 'swap()';
				break;
		}
	}

}