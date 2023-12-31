import {CSV} from './csv.js'

export let fsInited = false;
import * as BrowserFS from 'browserfs'
export const fs = BrowserFS.BFSRequire('fs');
const BFSBuffer = BrowserFS.BFSRequire('buffer').Buffer;

//TODO:
// generalize the fs initialization to support multiple file systems, probably should use a class to track those
//Generic reimplementation of reading/writing buffered objects from/to CSVs and IndexedDB


let initPromise;
// ----------------------------- Generic Functions for BrowserFS -----------------------------
export const initFS = async (
    dirs = ['data'],
    oninit=(exists=[])=>{}, 
    onerror=(e)=>{},
    filesystem='IndexedDB' //default is IndexedDB //https://github.com/jvilk/BrowserFS see all
) => {
    if (fsInited) {
        if(initPromise) {
            await initPromise;
        }
        return true;
    }
    else {
        fsInited = true;
        initPromise = new Promise ((resolve, reject) => {
            //let oldmfs = fs.getRootFS();
            BrowserFS.FileSystem[filesystem].Create({}, (e, mountableFileSystem) => {
                if (e) {
                    reject(e);
                    return
                }
                if (!mountableFileSystem) {
                    onerror(e);
                    
                    reject( new Error(`Error creating BrowserFS`) );
                    return
                }
                BrowserFS.initialize(mountableFileSystem); //fs now usable with imports after this
                //console.log(mountableFileSystem,filesystem);
                let promises = [];


                dirs.forEach( async (dir) => {
                    promises.push(dirExists(fs, dir));
                });

                Promise.all(promises).then((values) => {
                    oninit(values);
                    resolve(true)
                });
            });
        });
        return await initPromise;
    }
}

export const exists = async (path='') => {
    if(!fsInited) await initFS([path.split('/')[0]]);
    else await dirExists(fs,path.split('/')[0]);

    return await new Promise(resolve => {
        fs.exists('/'+path, function (exists) {
            resolve(exists);
        });
    })
}


export const readFile = async (path='data') => {
    if(!fsInited) await initFS([path.split('/')[0]]);
    else await dirExists(fs,path.split('/')[0]);

    return await  new Promise(resolve => {
        fs.readFile('/'+path, function(e, output) {
            resolve(output)
        });
    })
}


export async function readFileChunk (path='data', begin = 0, end = 5120, onread=(data)=>{}) {
    
    if(!fsInited) await initFS([path.split('/')[0]]);
    else await dirExists(fs,path.split('/')[0]);

    if (path != ''){
        return await  new Promise(async (resolve, reject) => { 
            fs.open('/'+path, 'r', (e, fd) => {
                if (e) {
                    reject(e);
                    return
                }

                fs.read(fd, end, begin, 'utf-8', (er, output, bytesRead) => {
                    if (er) {
                        reject(er);
                        return
                    }
                    if (bytesRead !== 0) {
                        let data = output.toString();
                    //Now parse the data back into the buffers.
                        fs.close(fd, () => {
                            onread(data,path);
                            resolve(data);
                        });
                    } else resolve(undefined);
                });
            });
        });
    } else {
        console.error('Path name is not defined')
        return undefined;
    }
}


export const getFilenames = async (directory = 'data', onload=(directory)=>{}) => {
    if(!fsInited) await initFS([directory]);
    else await dirExists(fs,directory);

    return await new Promise((resolve, reject) => {
        fs.readdir('/'+directory, (e, dir) => {
            if (e){
                reject(e);
                return
            }
            if (dir) {
                //console.log("files", dir);
                onload(dir);
                resolve(dir);
            }
            else resolve(undefined);
        });
    });
}

export const writeFile = async (path, data, onwrite=(data)=>{}) => {
    if(!fsInited) await initFS([path.split('/')[0]]);
    else await dirExists(fs,path.split('/')[0]);

    return await  new Promise((resolve, reject) => {
        fs.writeFile('/'+path, data, (err) => {
            if (err) {
                reject(err);
                return
            }
            onwrite(data);
            resolve(true);
        });
    });
}

export const appendFile = async (path, data, onwrite=(data)=>{}) => {
    if(!fsInited) await initFS([path.split('/')[0]]);
    else await dirExists(fs,path.split('/')[0]);
    
    return await  new Promise((resolve, reject) => {
        fs.appendFile('/'+path, data, (err) => {
            if (err) {
                reject(err);
                return
            }
            onwrite(data);
            resolve(true);
        });
    });
}

export const deleteFile = async (path='data', ondelete=()=>{})  => {
    if(!fsInited) await initFS([path.split('/')[0]]);
    else await dirExists(fs,path.split('/')[0]);

    return await  new Promise(resolve => {
        if (path != ''){
            fs.unlink('/'+path, (e) => {
                if (e) console.error(e);
                ondelete();
                resolve(true);
            });
        } else {
            console.error('Path name is not defined')
            resolve(false);
        }
    });
}

//read a browserfs file
export const readFileAsText = async (
    path='data', 
    end='end',
    begin=0,
    onread=(data,filename)=>{
        //console.log(filename,data);
    }) => {
    if(!fsInited) await initFS([path.split('/')[0]]);
    else await dirExists(fs,path.split('/')[0]);
    
    return await  new Promise(async (resolve, reject) => {

        let size = await getFileSize(path);
        
        if(end === 'end') {
            end = size;
        } else if (typeof end === 'number') {
            if(end > size) end = size;
        }

        fs.open('/'+path, 'r', (e, fd) => {
            if (e) {
                reject(e);
                return
            }
            fs.read(fd, end, begin, 'utf-8', (er, output, bytesRead) => {
                if (er) {
                    reject(er);
                    return
                }
                if (bytesRead !== 0) {
                    let data = output.toString();
                    //Now parse the data back into the buffers.
                    fs.close(fd, () => {
                        onread(data,path);
                        resolve(data);
                    });
                } else resolve(undefined);
            });
        });
    });
}



//
export const listFiles = async (dir='data', onload=(directory)=>{}) => {

    //console.log('check init', fsInited, dir)
    if(!fsInited) await initFS([dir]);
    else await dirExists(fs,dir);

    return await  new Promise((resolve, reject) => {
        fs.readdir('/'+dir, (e, directory) => {
            if (e) {
                reject(e);
                return
            }
            if (directory) {
                onload(directory);
                // if(fs_html_id){
                //     let filediv = document.getElementById(fs_html_id);
                //     filediv.innerHTML = "";
                //     directory.forEach((str, i) => {
                //         if (str !== "settings.json") {
                //             filediv.innerHTML += file_template({ id: str });
                //         }
                //     });
                //     directory.forEach((str, i) => {
                //         if (str !== "settings.json") {
                //             document.getElementById(str + "svg").onclick = () => {
                //                 console.log(str);
                //                 writeToCSV(str);
                //             }
                //             document.getElementById(str + "delete").onclick = () => {
                //                 deleteFile(dir + '/' + str);
                //             }
                //         }
                //     });
                // } 
            }
            resolve(directory);
        });
    });
    }



export const getFileSize = async (path='data',onread=(size)=>{}) => {

    if(!fsInited) await initFS([path.split('/')[0]]);
    else await dirExists(fs,path.split('/')[0]);

    return await new Promise((resolve, reject) => {
        fs.stat('/'+path,(e,stats) => {
            if(e) {
                reject(e)
                return
            }
            let filesize = stats.size;
            onread(filesize);
            resolve(filesize);
        });
    });
}


export const getCSVHeader = async (path='data', onopen=(header, filename)=>{}) => {
    
    if(!fsInited) await initFS([path.split('/')[0]]);
    else await dirExists(fs,path.split('/')[0]);

    return await  new Promise((resolve, reject) => {
        fs.open('/'+path,'r',(e,fd) => {
            if(e) {
                reject(e)
                return
            }
            fs.read(fd,65535,0,'utf-8',(er,output,bytesRead) => {  //could be a really long header for all we know
                if (er) {
                    reject(er)
                    return;
                }
                if(bytesRead !== 0) {
                    let data = output.toString();
                    let lines = data.split('\n');
                    let header = lines[0];
                    //Now parse the data back into the buffers.
                    fs.close(fd,()=>{   
                        onopen(header, path);
                        resolve(header);
                    });
                }
                else resolve(undefined);
            }); 
        });
    });
}
    //Write db data (preprocessed) into a CSV, in chunks to not overwhelm memory. This is for pre-processed data
    export const writeToCSVFromDB = async (path='data', fileSizeLimitMb=10) => {
        if(!fsInited) await initFS([path.split('/')[0]]);
        else await dirExists(fs,path.split('/')[0]);
    
        return await new Promise((resolve, reject) => {
        if (path != ''){
            fs.stat('/' + path, (e, stats) => {
                if (e) {
                    reject(e);
                    return
                }
                let filesize = stats.size;
                fs.open(path, 'r', (e, fd) => {
                    if (e) {
                        reject(e);
                        return
                    }
                    let i = 0;
                    let maxFileSize = fileSizeLimitMb * 1024 * 1024;
                    let end = maxFileSize;
                    if (filesize < maxFileSize) {
                        end = filesize;
                        fs.read(fd, end, 0, 'utf-8', (e, output, bytesRead) => {
                            if (e) {
                                reject(e);
                                return
                            }
                            if (bytesRead !== 0) CSV.saveCSV(output.toString(), path.split('/')[1]);
                            fs.close(fd);
                            resolve(true);
                        });
                    }
                    else {
                        const writeChunkToFile = async () => {
                            if (i < filesize) {
                                if (i + end > filesize) { end = filesize - i; }
                                let chunk = 0;
                                fs.read(fd, end, i, 'utf-8', (e, output, bytesRead) => {
                                    if (e) {
                                        reject(e);
                                        return
                                    }
                                    if (bytesRead !== 0) {
                                        CSV.saveCSV(output.toString(), path.split('/')[1] + "_" + chunk);
                                        i += maxFileSize;
                                        chunk++;
                                        writeChunkToFile();
                                        fs.close(fd);
                                        resolve(true);
                                    }
                                });
                            }
                        }
                    }
                    //let file = fs.createWriteStream('./'+State.data.sessionName+'.csv');
                    //file.write(data.toString());
                });
            });
        } else {
            console.error('File name is not defined.');
            resolve(false);
        }
    });
}

//iterate asynchronously over a file (or a specific range of a file) and run a function on the data
export async function processCSVChunksFromDB(path='data', onData=(csvdata,start,end,size)=>{}, maxChunkSize=10000, start=0, end='end', options={}) {

    let size = await getFileSize(path);

    let partition = start;

    return await new Promise((res,rej) => {
        let processPartition = () => {
                let endChunk = partition+maxChunkSize;
                if(endChunk > size) {
                    endChunk = size;
                }
                readCSVChunkFromDB(path,partition,endChunk,options).then(async (result) => {
                    await onData(result,partition,endChunk,size);
                    //console.log(partition,endChunk,size);
                    partition = endChunk;
                    if(partition !== size) {
                        processPartition();
                    } else {
                        res(true);
                    }
                }).catch(rej);
            
        }

        processPartition();
    });
}

//returns an object with the headers and correctly sized outputs (e.g. single values or arrays pushed in columns)
export async function readCSVChunkFromDB(path='data', start=0, end='end', options={}) {
    if(!fsInited) await initFS([path.split('/')[0]]);
    else await dirExists(fs,path.split('/')[0]);

    const transpose = options.transpose || false;

    let head = await getCSVHeader(path);

    if(head) head = head.split(',');
    else return undefined;

    let resultLengths = [];
    let resultNames = [];
    let results = (transpose) ? [] : {}

    head.forEach((v) => {
        if(v) {
            resultNames.push(v);
            resultLengths.push(1);
        }
        else resultLengths[resultLengths.length-1]++;
    });
    
    let size = await getFileSize(path);
    if(end === 'end') end = size;
    else if(end > size) {
        start = size-(end-start);
        end = size;
    }


    let data = (await readFileChunk(path,start,end))?.split('\n').slice(1, -1) // exclude header and last pseudoline

    let preprocess = (value) => {
        try { value = JSON.parse(value) } catch {}
        return value;
    }
    
    if(data) data.forEach((r,i) => {
        let row = r.split(',');
        if (transpose) {
            const entry = {}
            if(options.json) row.forEach((v, idx) => {if(options.json) entry[resultNames[idx]] = preprocess(v); else entry[resultNames[idx]] = v;})
            results.push(entry)
        } else {
            row.forEach((v,i) => {
                const header = resultNames[i]
                if (!results[header]) results[header] = [];
                if(options.json) results[header].push(preprocess(v))
                else results[header].push(v);
            })
        }
    });


    return results;
}

let directories = {};
export const dirExists = async (fs, directory) => {

    if(!fsInited) await initFS([directory]);
    return await new Promise((resolve, reject) => {
        if(!directory) reject(false);
        if (directories[directory] === 'exists' || directories[directory] === 'created'){
            resolve()
        } else {
            if(directory[0] === '/') directory = directory.substring(1);
            if(!directory) reject(false);
            fs.exists(`/${directory}`, (exists) => {
                if (exists) {
                    directories[directory] = 'exists'
                    //console.log(`/${directory} exists!`)
                    resolve();
                }
                else if (directories[directory] === 'creating'){
                    //console.log(directory + ' is still being created.')
                    resolve();
                }
                else {
                    //console.log('creating ' + `/${directory}`, fs);
                    directories[directory] = 'creating';
                    fs.mkdir(`/${directory}`, 1, (err) => {
                        if (err) {
                            reject(err);
                            return
                        }
                        directories[directory] = 'created'
                        setTimeout(resolve, 500)
                    });
                }

            });
        }
    });
}

//redundant declaration prevents minification of names for the routes
export const BFSRoutes = {
    initFS:initFS,
    dirExists:dirExists,
    exists:exists,
    readFile:readFile,
    readFileChunk:readFileChunk,
    getFilenames:getFilenames,
    writeFile:writeFile,
    appendFile:appendFile,
    deleteFile:deleteFile,
    readFileAsText:readFileAsText,
    getFileSize:getFileSize,
    getCSVHeader:getCSVHeader,
    listFiles:listFiles
};