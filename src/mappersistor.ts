import * as fs from 'fs';

//persists maps that hold number-keys and values of type V in the filePath
export class MapPersistor<V>{
    private path: string;
    constructor(filePath: string) {
        this.path = filePath;
        console.log('Persistor: In working order');
    }

    //returns an array with:
    //the number-V-map in filePath
    //the number right above the highest key
    async loadData(): Promise<[Map<number, V>, number]> {
        //make an empty map:
        let users = new Map<number, V>();
        let idCounter = 0;

        //if a save-file exists, use its' data instead of the empty map
        if (fs.existsSync(this.path)) {
            try {
                //load the data from the file
                let loadedData = await new Promise<string>((resolve, reject) => {
                    fs.readFile(this.path, 'utf8', (err, data)=>{
                        if (err){
                            reject(err);
                        }
                        resolve(data);
                    })
                });

                //transform the contents back into a map
                users = new Map<number, V>(JSON.parse(loadedData));

                //initialize idCounter based on pre-existing entries
                idCounter = 0;
                users.forEach((value, key, map) => {
                    if (key >= idCounter) {
                        idCounter = key + 1;
                    }
                });
            }
            catch (ex) {
                console.error("ERROR occurred while loading data, maybe the file is faulty? Stop the program to not overwrite: %s", ex);
            }

        }
        console.log('Persistor: Data loaded');
        return [users, idCounter];
    }

    //saves the given Map (toBePersisted) in the Objects filePath
    persistData(toBePersisted: Map<number, V>){
        fs.writeFileSync(this.path, JSON.stringify([...toBePersisted]));
        console.log('Persistor: Data persisted');
    }
}