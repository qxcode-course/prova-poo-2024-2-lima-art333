function input(): string { let X: any = input; X.L = X.L || require("fs").readFileSync(0).toString().split(/\r?\n/); return X.L.shift(); } // _TEST_ONLY_
//function input(): string { let X: any = input; X.P = X.P || require("readline-sync"); return X.P.question() } // _FREE_ONLY_
function write(text: any, endl="\n") { process.stdout.write("" + text + endl); }
export {};


class Notebook {
    ligado: boolean;
    tempoUso: number;
    carregador: Carregador | null;
    constructor(){
        this.ligado = false;
        this.tempoUso = 0
    }
    saida_string: string
    toString(): string {
        this.saida_string = ""
        if(this.ligado){
            this.saida_string += `Notebook: ligado por ${this.tempoUso} min`;
        }
        if(!this.ligado){
            this.saida_string +=  `Notebook: desligado`;
        }
        if(this.carregador){
            this.saida_string += `, ${this.carregador.toString()}`
        }
        return this.saida_string
    }

    ligar() {
        if(this.carregador == null){
            console.log("fail: não foi possível ligar");
        }
        else{
            this.ligado = true
        }
    }
    usar(tempoUso: number): void{
        if(!this.ligado){
            console.log("fail: desligado");
        }
        else {
            this.tempoUso += tempoUso;
        }
    }
    setCarregador(potencia: number): void {
        this.carregador = new Carregador(potencia);
        this.carregador?.setPotencia(potencia)
    }
}
class Carregador{
    potencia: number
    constructor(potencia: number) {
        this.potencia = potencia;
    }
    toString(): string {
        return `Carregador ${this.potencia}W`;
    }
    setPotencia(potencia: number){

    }
}


class Adapter {
    private notebook: Notebook = new Notebook();
    show(): void {
        console.log(this.notebook.toString());
    }

    turnOn(): void {
        this.notebook.ligar();
    }

    turnOff(): void {
        // this.notebook.turnOff();
    }

    setCharger(power: number): void {
        this.notebook.setCarregador(power)
    }

    removeCharger(): void {
        // let charger = this.notebook.removeCharger();
        // if (charger) {
        //     console.log(`Removido ${charger}`);
        // } else {
        //     console.log("fail: Sem carregador");
        // }
    }

    setBattery(capacity: number): void {
        //TODO Implementar
    }

    removeBattery(): void {
        // let battery = this.notebook.removeBattery();
        // if (battery) {
        //     console.log(`Removido ${battery}`);
        // } else {
        //     console.log("fail: Sem bateria");
        // }
    }

    use(minutes: number): void {
        this.notebook.usar(minutes);
    }
}

// Função principal
function main() {
    const adapter = new Adapter();
    while (true) {
        let line = input();
        let args = line.split(" ");
        write("$" + line);

        if      (args[0] === "end"        ) { break;                           }
        else if (args[0] === "show"       ) { adapter.show();                  }
        else if (args[0] === "turn_on"    ) { adapter.turnOn();                }
        else if (args[0] === "turn_off"   ) { adapter.turnOff();               }
        else if (args[0] === "use"        ) { adapter.use(+args[1]);           }
        else if (args[0] === "set_charger") { adapter.setCharger(+args[1]);    }
        else if (args[0] === "rm_charger" ) { adapter.removeCharger();         }
        else if (args[0] === "set_battery") { adapter.setBattery(+args[1]);    }
        else if (args[0] === "rm_battery" ) { adapter.removeBattery();         }
        else                                { write("fail: comando inválido"); }

    }
}

main();
