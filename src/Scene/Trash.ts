class Trash extends eui.Component implements eui.UIComponent {
	public idLabel: eui.Label;
	public id: number;
	public image: eui.Image;

	public constructor(_id: number) {
		super();
		this.id = _id;
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		this.idLabel.text = this.id.toString();
	}

	public highlight(): void {
		var color: number = 0x33CCFF;        /// 光晕的颜色，十六进制，不包含透明度
		var alpha: number = 0.8;             /// 光晕的颜色透明度，是对 color 参数的透明度设定。有效值为 0.0 到 1.0。例如，0.8 设置透明度值为 80%。
		var blurX: number = 35;              /// 水平模糊量。有效值为 0 到 255.0（浮点）
		var blurY: number = 35;              /// 垂直模糊量。有效值为 0 到 255.0（浮点）
		var strength: number = 2;            /// 压印的强度，值越大，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
		var quality: number = egret.BitmapFilterQuality.HIGH;        /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
		var inner: boolean = false;            /// 指定发光是否为内侧发光，暂未实现
		var knockout: boolean = false;            /// 指定对象是否具有挖空效果，暂未实现
		var glowFilter: egret.GlowFilter = new egret.GlowFilter(color, alpha, blurX, blurY, strength, quality, inner, knockout);
		this.image.filters = [glowFilter];
	}

	public highlightOff(): void {
		this.image.filters = [];
	}
}