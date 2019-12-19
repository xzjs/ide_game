declare function showBlock();
declare function showPython();
declare function showAnalysis();

class SortScene extends eui.Component implements eui.UIComponent {
	public trashs: Trash[] = new Array();
	public index: number;
	public jsonArray: Array<Array<number>>;
	public nums: number[] = [9, 7, 5, 3, 1];
	public sceneLabel: eui.Label;
	public checkArray: number[];

	public scenes = [
		this.scene0,
		this.scene1,
		this.scene2,
		showBlock,
		// this.test,
		this.scene3,
		showPython,
		// this.test,
		this.scene4,
		showBlock,
		// this.test1,
		this.scene5,
		showPython,
		// this.test1,
		this.scene6,
	]
	public sceneIndex: number = 0;

	public constructor() {
		super();
		this.initTrash();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		this.sceneChange();
		this.sceneLabel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sceneChange, this);
	}

	public scene0(vm: this): void {
		vm.sceneLabel.text = '将垃圾桶按照小到大的顺序排列(点击继续)';
	}

	public scene1(vm: this): void {
		vm.sceneLabel.text = '让我们先来找到要排列的最小单元';
		vm.trashs[0].highlight();
		vm.trashs[1].highlight();
	}

	public scene2(vm: this): void {
		vm.sceneLabel.text = '让我们来编写积木代码';
		vm.checkArray = [0, 1];
		vm.trashs[2].visible = false;
		vm.trashs[3].visible = false;
		vm.trashs[4].visible = false;
	}

	public scene3(vm: this): void {
		vm.sceneLabel.text = '让我们用python代码再写一遍';
		vm.reset();
	}

	public scene4(vm: this): void {
		vm.sceneLabel.text = '用最小单元组合成我们最初的问题,编写积木代码';
		vm.reset();
		vm.trashs[2].visible = true;
		vm.trashs[3].visible = true;
		vm.trashs[4].visible = true;
		for (let i = 1; i < vm.trashs.length - 1; i++) {
			setTimeout(function () {
				vm.trashs[i - 1].highlightOff();
				vm.trashs[i + 1].highlight();
			}, 1500 * i);
		}
		vm.checkArray = [0, 1, 2, 3, 4];
	}

	public scene5(vm: this): void {
		vm.sceneLabel.text = '用python来解决这个问题';
		vm.reset();
	}

	public scene6(vm: this): void {
		vm.sceneLabel.text = '恭喜你完成了本次教程';
		vm.sceneLabel.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.sceneChange, vm);
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
	public initTrash(): void {
		for (let i = 0; i < this.nums.length; i++) {
			let trash = new Trash(this.nums[i]);
			trash.x = i * 160 + 460;
			trash.y = 480;
			this.addChild(trash);
			this.trashs.push(trash);
		}
	}

	/**
	 * 交换垃圾桶
	 */
	public change() {
		var arr = this.jsonArray[this.index++];
		let left = arr[0];
		let right = arr[1];
		let trashLeft = this.trashs[left];
		let leftX = trashLeft.x;
		let trashRight = this.trashs[right]
		let rightX = trashRight.x;
		egret.Tween.get(trashLeft).to({ x: rightX }, 1000);
		egret.Tween.get(trashRight).to({ x: leftX }, 1000);
		var temp = this.trashs[left];
		this.trashs[left] = this.trashs[right];
		this.trashs[right] = temp;
	}

	/**
	 * 检查排序是否完成
	 */
	public check(): void {
		let result = true;
		for (let i = 0; i < this.checkArray.length - 1; i++) {
			if (this.trashs[i].id > this.trashs[i + 1].id) {
				result = false;
				break;
			}
		}
		if (result) {
			this.sceneLabel.text = '恭喜你，成功了';
		} else {
			this.sceneLabel.text = '似乎不对，让我们再试一次';
			this.sceneIndex -= 2;
		}
	}

	public test(vm: this) {
		vm.startChange([[0, 1]]);
	}

	public test1(vm: this) {
		vm.startChange([
			[0, 4],
			// [1, 3]
		]);
	}

	/**
	 * 重置垃圾桶
	 */
	public reset() {
		let length = this.checkArray.length;
		for (let i = 0; i < length - 1; i++) {
			for (let j = 0; j < length - i - 1; j++) {
				if (this.trashs[j].id < this.trashs[j + 1].id) {
					let x = this.trashs[j].x;
					this.trashs[j].x = this.trashs[j + 1].x;
					this.trashs[j + 1].x = x;
					let tmp = this.trashs[j];
					this.trashs[j] = this.trashs[j + 1];
					this.trashs[j + 1] = tmp;
				}
			}
		}
	}
}