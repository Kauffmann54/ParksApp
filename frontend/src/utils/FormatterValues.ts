import moment from "moment";

export const formatNumber = (value: String): number => {
    if (value === undefined || value === "") {
        return 0;
    }
    try {
        return Number.parseFloat(value.replace('.', 'P').replace(',', '.').replace('P', ','));
    } catch (error) {
        return 0;
    }
};

export function formatterMoney(value: number):string {
    const valueFormatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
    }).format(value);

    return valueFormatted;
};

export function formatterDate(date: Date):string {
    return moment(date)
    .format('ddd. DD MMMM YYYY').toLowerCase();
};

export function formatterDateDefault(date: Date):string {
    return moment(date)
    .format('DD/MM/YYYY').toLowerCase();
};

export const getFormattedHour = (date: string) => {
    const dateFormatted = new Date(date)
    return dateFormatted.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
}

export const getAtualYear = () => {
    const dateFormatted = getCurrentDate();
    return dateFormatted.getFullYear();
}

export function removeUndefinedProps(obj: any):any {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop) && obj[prop] === undefined) {
            delete obj[prop];
        }
    }
    return obj;
};

export function limitCharacters(value: string, limit: number): string {
    if (value.length > limit) {
        return value.substring(0, limit) + '...';
    }
    return value;
};

export function range(start: number, end: number): number[] {
    return Array.from({length: (end - start)}, (v, k) => k + start);
};

export function capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export function capitalizeFirstLetterEachWord(value: string): string {
    var words = value.split(" ");

    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    
    return words.join(" ");
}

/**
* Copy a string to clipboard
* @param  {String} string         The string to be copied to clipboard
*/
export function copyToClipboard(string: string):boolean {
    try {
        navigator.clipboard.writeText(string);
        return true;
    } catch (error) {
        return false;
    }
}

const stringToColor = (string: string) => {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
}

export const stringAvatar = (name: string) => {
    return {
        sx: {
        bgcolor: stringToColor(name),
        },
        children: `${name.split(' ').length > 1 ? `${name.split(' ')[0][0]}${name.split(' ')[1][0]}` : `${name.split(' ')[0][0]}`}`,
    };
}

export const convertToHumanFileSize = (bytes: number, si=false, dp=1) => {
    const thresh = si ? 1000 : 1024;
  
    if (Math.abs(bytes) < thresh) {
      return bytes + ' B';
    }
  
    const units = si 
      ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] 
      : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    const r = 10**dp;
  
    do {
      bytes /= thresh;
      ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);
  
  
    return bytes.toFixed(dp) + ' ' + units[u];
}

export const convertFiletToBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        const base64String = fileReader.result;
        if (base64String) {
            const base64Image = base64String.toString().split(';base64,').pop();
            resolve(base64Image);
        }
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
};

export const getCurrentDate = (): Date => {
    const date = localStorage.getItem('currentDate');
    return date ? moment(date).utcOffset(0).toDate() : moment().utcOffset(0).toDate();
}

export const getMaxProductMultiplier = (value: number, multiplier: number): number => {
    return Math.floor(value/multiplier);
}