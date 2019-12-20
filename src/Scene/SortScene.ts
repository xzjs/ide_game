declare function showBlock();
declare function showPython();
declare function showAnalysis();

class SortScene extends eui.Component implements eui.UIComponent {
	public dialog: Dialog;
	public explain: Explain;
	public card0: Card;
	public card1: Card;
	public card2: Card;
	public card3: Card;
	public card4: Card;
	public cards: Card[];
	public index: number;
	public jsonArray: Array<Array<number>>;
	public nums: number[] = [9, 7, 5, 3, 1];
	public sceneLabel: eui.Label;
	public checkArray: number[];

	public scenes = [
		this.scene0,
		this.scene1,
		this.scene2,
		// showBlock,
		this.test,
		this.sceneBlock,
		this.scene3,
		// showPython,
		this.test,
		this.sceneCode,
		this.scene4,
		// showBlock,
		this.test1,
		this.scene5,
		// showPython,
		this.test1,
		this.scene6,
	]
	public sceneIndex: number = 0;

	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		this.initCard();
		this.sceneChange();
		this.dialog.button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sceneChange, this);
	}

	public scene0(vm: this): void {
		vm.dialog.setText('黑板上有从大到小排列的卡片，现在需要将卡片编程从小到大排列');
	}

	public scene1(vm: this): void {
		vm.dialog.setText('遇到复杂问题不要怕，化繁为简，让我们先来找到要排列的最小单元');
		vm.cards[0].highlight();
		vm.cards[1].highlight();
	}

	public scene2(vm: this): void {
		vm.dialog.setText('让我们来编写积木代码');
		vm.explain.setText(0);
		vm.explain.visible = true;
		vm.checkArray = [0, 1];
		vm.cards[2].visible = false;
		vm.cards[3].visible = false;
		vm.cards[4].visible = false;
	}

	public sceneBlock(vm: this): void {
		vm.dialog.setText('请记住这个最小模块，后面我们还会用到', 'block_png');
	}

	public scene3(vm: this): void {
		vm.dialog.setText('让我们用python代码再写一遍');
		vm.explain.setText(1);
		vm.explain.visible = true;
		vm.reset();
	}

	public sceneCode(vm: this): void {
		vm.dialog.setText('请记住这段最小代码，后面我们还会用到', 'code_png');
	}

	public scene4(vm: this): void {
		vm.dialog.setText('用最小单元组合成我们最初的问题,编写积木代码');
		vm.reset();
		vm.cards[2].visible = true;
		vm.cards[3].visible = true;
		vm.cards[4].visible = true;
		for (let i = 1; i < vm.cards.length - 1; i++) {
			setTimeout(function () {
				vm.cards[i - 1].highlightOff();
				vm.cards[i + 1].highlight();
			}, 1500 * i);
		}
		vm.checkArray = [0, 1, 2, 3, 4];
	}

	public scene5(vm: this): void {
		vm.dialog.setText('用python来解决这个问题，你会体会到python是多么的简洁');
		vm.reset();
	}

	public sceneConclusion(vm: this): void {
		vm.dialog.setText('我们刚才所写的代码就是排序中最简单的冒泡排序，排序和选择是计算机算法的两大基础，会在很多地方用到，诸如后面会学到的数据库等');
	}

	public scene6(vm: this): void {
		vm.dialog.setText('恭喜你完成了本次教程');
		vm.dialog.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.sceneChange, vm);
		showAnalysis();
	}

	public sceneChange(): void {
		this.scenes[this.sceneIndex++](this);
	}

	/**
	 * 开始交换垃圾桶
	 */
	public startChange(data): void {
		this.index = 0;
		this.jsonArray = data;
		var timer: egret.Timer = new egret.Timer(1000, this.jsonArray.length);
		timer.addEventListener(egret.TimerEvent.TIMER, this.change, this);
		timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.check, this);
		timer.start();
	}

	/**
	 * 交换垃圾桶
	 */
	public initCard(): void {
		this.cards = [this.card0, this.card1, this.card2, this.card3, this.card4];
		let nums = [9, 7, 5, 3, 1];
		for (let i = 0; i < this.cards.length; i++) {
			this.cards[i].setNum(nums[i]);
		}
	}

	/**
	 * 交换垃圾桶
	 */
	public change() {
		var arr = this.jsonArray[this.index++];
		let left = arr[0];
		let right = arr[1];
		let CardLeft = this.cards[left];
		let leftX = CardLeft.x;
		let CardRight = this.cards[right]
		let rightX = CardRight.x;
		egret.Tween.get(CardLeft).to({ x: rightX }, 1000);
		egret.Tween.get(CardRight).to({ x: leftX }, 1000);
		var temp = this.cards[left];
		this.cards[left] = this.cards[right];
		this.cards[right] = temp;
	}

	/**
	 * 检查排序是否完成
	 */
	public check(): void {
		let result = true;
		for (let i = 0; i < this.checkArray.length - 1; i++) {
			if (this.cards[i].num > this.cards[i + 1].num) {
				result = false;
				break;
			}
		}
		if (result) {
			this.explain.visible = false;
			this.dialog.setText('恭喜你，成功了');
		} else {
			this.dialog.setText('似乎不对，让我们再试一次');
			this.sceneIndex -= 2;
		}
	}

	public test(vm: this) {
		vm.startChange([[0, 1]]);
	}

	public test1(vm: this) {
		vm.startChange([
			[0, 4],
			[1, 3]
		]);
	}

	/**
	 * 重置垃圾桶
	 */
	public reset() {
		let length = this.checkArray.length;
		for (let i = 0; i < length - 1; i++) {
			for (let j = 0; j < length - i - 1; j++) {
				if (this.cards[j].num < this.cards[j + 1].num) {
					let x = this.cards[j].x;
					this.cards[j].x = this.cards[j + 1].x;
					this.cards[j + 1].x = x;
					let tmp = this.cards[j];
					this.cards[j] = this.cards[j + 1];
					this.cards[j + 1] = tmp;
				}
			}
		}
	}
}