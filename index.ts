interface ISO8583 {
    MessageTypeIndicator: string;
    PrimaryBitmap: string;
    SecondaryBitmap?: string;
    DataElements: DataElement[];
}

interface DataElementDescriptor {
    position: number;
    name: string;
    dataElementType: DataElementType;

    /**
     * For variable length fields, identifies the number of characters defining length (16 vs 120).
     * 
     * For fixed length fields, identifies the number of characters in that field.
     */
    length: number;

    /**
     * TODO: Max length
     * max: number;
     */

}

interface DataElement {
    position: number;
    value: string;
}

/**
 * Describes the data element.
 * 
 * TODO: Consider defining numeric, alpha-numeric, etc., values.
 */
enum DataElementType {
    Default,
    Fixed,
    Variable
}

let dataElementDescriptors: DataElementDescriptor[] = [
    {
        position: 1,
        name: "Bitmap",
        length: -1,
        dataElementType: DataElementType.Default
    },
    {
        position: 2,
        name: "Primary Account Number",
        length: 2,
        dataElementType: DataElementType.Variable
    },
    {
        position: 3,
        name: "Processing Code",
        length: 6,
        dataElementType: DataElementType.Fixed
    },
    {
        position: 4,
        name: "Amount, Transaction",
        length: 12,
        dataElementType: DataElementType.Fixed
    },
    {
        position: 5,
        name: "Amount, Settlement",
        length: 12,
        dataElementType: DataElementType.Fixed
    },
    {
        position: 6,
        name: "Amount, Cardholder Billing",
        length: 12,
        dataElementType: DataElementType.Fixed
    },
    {
        position: 7,
        name: "Transmission Date & Time",
        length: 10,
        dataElementType: DataElementType.Fixed
    },
    {
        position: 8,
        name: "Amount, Cardholder Bill Fee",
        length: 8,
        dataElementType: DataElementType.Fixed
    },
    {
        position: 9,
        name: "Conversion Rate, Settlement",
        length: 8,
        dataElementType: DataElementType.Fixed
    },
    {
        position: 10,
        name: "Conversion Rate, Cardholder Billing",
        length: 8,
        dataElementType: DataElementType.Fixed
    },
    {
        position: 11,
        name: "System Trace Audit Number", // STAN
        length: 6,
        dataElementType: DataElementType.Fixed
    },
    {
        position: 12,
        name: "Local Transaction Time (hhmmss)",
        length: 6,
        dataElementType: DataElementType.Fixed
    },
    {
        position: 13,
        name: "Local Transaction Date (MMDD)",
        length: 4,
        dataElementType: DataElementType.Fixed
    },
    {
        position: 14,
        name: "Expiration Date (YYMM)",
        length: 4,
        dataElementType: DataElementType.Fixed
    },
    {
        position: 15,
        name: "Settlement Date",
        length: 4,
        dataElementType: DataElementType.Fixed
    },
    {
        position: 16,
        name: "Currency Conversion Date",
        length: 4,
        dataElementType: DataElementType.Fixed
    },
    {
        position: 17,
        name: "Capture Date",
        length: 4,
        dataElementType: DataElementType.Fixed
    },
    {
        position: 18,
        name: "Merchant Type, or Merchant Category Code",
        length: 4,
        dataElementType: DataElementType.Fixed
    },
    {
        position: 19,
        name: "Acquiring Institution (Country Code)",
        length: 3,
        dataElementType: DataElementType.Fixed
    },
    {
        position: 20,
        name: "PAN Extended (Country Code)",
        length: 3,
        dataElementType: DataElementType.Fixed
    },
    {
        position: 21,
        name: "Forwarding Institution (Country Code)",
        length: 3,
        dataElementType: DataElementType.Fixed
    },
    {
        position: 22,
        name: "Point of Service Entry Mode",
        length: 12,
        dataElementType: DataElementType.Fixed
    },
    {
        position: 23,
        name: "Application PAN Sequence Number",
        length: 3,
        dataElementType: DataElementType.Fixed
    },
    {
        position: 24,
        name: "Function Code (ISO 8583: 1993), or Network International Identifier", // NII
        length: 3,
        dataElementType: DataElementType.Fixed
    },
    {
        position: 25,
        name: "Point of Service Condition Code",
        length: 2,
        dataElementType: DataElementType.Fixed
    },
    {
        position: 26,
        name: "Point of Service Capture Code",
        length: 2,
        dataElementType: DataElementType.Fixed
    },
    {
        position: 27,
        name: "Authorizing Identification Response Length",
        length: 1,
        dataElementType: DataElementType.Fixed
    },
    {
        position: 28,
        name: "Amount, Transaction Fee",
        length: 8, // x+n
        dataElementType: DataElementType.Fixed
    },
    {
        position: 29,
        name: "Amount, Settlement Fee",
        length: 8, // x+n
        dataElementType: DataElementType.Fixed
    },
    {
        position: 30,
        name: "Amount, Transaction Processing Fee",
        length: 8, // x+n
        dataElementType: DataElementType.Fixed
    },
    {
        position: 31,
        name: "Amount, Settlement Processing Fee",
        length: 8, // x+n
        dataElementType: DataElementType.Fixed
    },
    {
        position: 32,
        name: "Acquiring Institution Identification Code",
        length: 2, // Variable to 11
        dataElementType: DataElementType.Variable
    },
    {
        position: 33,
        name: "Forwarding Institution Identification Code",
        length: 2, // Variable to 11
        dataElementType: DataElementType.Variable
    },
    {
        position: 34,
        name: "Primary Account Number, Extended",
        length: 2, // ns .. 28
        dataElementType: DataElementType.Variable
    },
    {
        position: 35,
        name: "Track 2 Data",
        length: 2, // z .. 37
        dataElementType: DataElementType.Variable
    },
    {
        position: 36,
        name: "Track 3 Data",
        length: 2, // n .. 104
        dataElementType: DataElementType.Variable
    },
    {
        position: 37,
        name: "Retrieval Reference Number",
        length: 12, // an
        dataElementType: DataElementType.Fixed
    },
    {
        position: 38,
        name: "Authorization Identification Response",
        length: 6, // an
        dataElementType: DataElementType.Fixed
    },
    {
        position: 39,
        name: "Response Code",
        length: 2, // AN
        dataElementType: DataElementType.Fixed
    },
    {
        position: 40,
        name: "Service Restriction Code",
        length: 3,
        dataElementType: DataElementType.Fixed
    },
    {
        position: 41,
        name: "Card Acceptor Terminal Identification",
        length: 8, // ans
        dataElementType: DataElementType.Fixed
    },
    {
        position: 42,
        name: "Card Acceptor Identification Code",
        length: 15,
        dataElementType: DataElementType.Fixed
    },
    {
        position: 43,
        name: "Card Acceptor Name/Location ((1-23 street address, -36 city, -38 state, 39-40 country)",
        length: 40,
        dataElementType: DataElementType.Fixed
    },
    {
        position: 44,
        name: "Additional Response Data",
        length: 2, // an .. 25
        dataElementType: DataElementType.Variable
    },
    {
        position: 45,
        name: "Track 1 Data",
        length: 2, // an .. 76
        dataElementType: DataElementType.Variable
    },
    {
        position: 46,
        name: "Additional Data (ISO)",
        length: 3, // an ... 999
        dataElementType: DataElementType.Variable
    },
    {
        position: 47,
        name: "Additional Data (National)",
        length: 3, // an ... 999
        dataElementType: DataElementType.Variable
    },
    {
        position: 48,
        name: "Additional Data (Private)",
        length: 3, // an ... 999
        dataElementType: DataElementType.Variable
    },
    {
        position: 49,
        name: "Currency Code, Transaction",
        length: 3, // a or n
        dataElementType: DataElementType.Fixed
    },
    {
        position: 50,
        name: "Currency Code, Settlement",
        length: 3, // a or n
        dataElementType: DataElementType.Fixed
    },
    {
        position: 51,
        name: "Currency Code, Cardholder Billing",
        length: 3, // a or n
        dataElementType: DataElementType.Fixed
    },
    {
        position: 52,
        name: "Personal Identification Number Data",
        length: 64, // b
        dataElementType: DataElementType.Fixed
    },
    {
        position: 53,
        name: "Security Related Control Information",
        length: 16, // n
        dataElementType: DataElementType.Fixed
    },
    {
        position: 54,
        name: "Additional Amounts",
        length: 3, // an ... 120
        dataElementType: DataElementType.Variable
    },
    {
        position: 55,
        name: "ICC Data - EMV Having Multiple Tags",
        length: 3, // an ... 999
        dataElementType: DataElementType.Variable
    },
    {
        position: 56,
        name: "Reserved (ISO)",
        length: 3, // ans ... 999
        dataElementType: DataElementType.Variable
    },
    {
        position: 57,
        name: "Reserved (National)",
        length: 3, // ans ... 999
        dataElementType: DataElementType.Variable
    },
    {
        position: 58,
        name: "Reserved (National)",
        length: 3, // ans ... 999
        dataElementType: DataElementType.Variable
    },
    {
        position: 59,
        name: "Reserved (National)",
        length: 3, // ans ... 999
        dataElementType: DataElementType.Variable
    },
    {
        position: 60,
        name: "Reserved (Private)",
        length: 3, // ans ... 999
        dataElementType: DataElementType.Variable
    },
    {
        position: 61,
        name: "Reserved (Private)",
        length: 3, // ans ... 999
        dataElementType: DataElementType.Variable
    },
    {
        position: 62,
        name: "Reserved (National)",
        length: 3, // ans ... 999
        dataElementType: DataElementType.Variable
    },
    {
        position: 63,
        name: "Reserved (National)",
        length: 3, // ans ... 999
        dataElementType: DataElementType.Variable
    },
    {
        position: 64,
        name: "Message Authentication Code",
        length: 64, // b
        dataElementType: DataElementType.Fixed
    },
    {
        position: 65,
        name: "Extended Bitmap Indicator",
        length: 1, // b
        dataElementType: DataElementType.Fixed
    },
    {
        position: 66,
        name: "Settlement Code",
        length: 1, // n
        dataElementType: DataElementType.Fixed
    },
    {
        position: 67,
        name: "Extended Payment Code",
        length: 2, // n
        dataElementType: DataElementType.Fixed
    },
    {
        position: 68,
        name: "Receiving Institution Country Code",
        length: 3, // n
        dataElementType: DataElementType.Fixed
    },
    {
        position: 69,
        name: "Settlement Institution Country Code",
        length: 3, // n
        dataElementType: DataElementType.Fixed
    },
    {
        position: 70,
        name: "Network Management Information Code",
        length: 3, // n
        dataElementType: DataElementType.Fixed
    },
    {
        position: 71,
        name: "Message Number",
        length: 4, // n
        dataElementType: DataElementType.Fixed
    },
    {
        position: 72,
        name: "Last Message's Number",
        length: 4, // n
        dataElementType: DataElementType.Fixed
    },
    {
        position: 73,
        name: "Action Date (YYMMDD)",
        length: 6, // n
        dataElementType: DataElementType.Fixed
    },
    {
        position: 74,
        name: "Number of Credits",
        length: 10, // n
        dataElementType: DataElementType.Fixed
    },
    {
        position: 75,
        name: "Credits, Reversal Number",
        length: 10, // n
        dataElementType: DataElementType.Fixed
    },
    {
        position: 76,
        name: "Number of Debits",
        length: 10, // n
        dataElementType: DataElementType.Fixed
    },
    {
        position: 77,
        name: "Debits, Reversal Number",
        length: 10, // n
        dataElementType: DataElementType.Fixed
    },
    {
        position: 78,
        name: "Transfer Number",
        length: 10, // n
        dataElementType: DataElementType.Fixed
    },
    {
        position: 79,
        name: "Transfer, Reversal Number",
        length: 10, // n
        dataElementType: DataElementType.Fixed
    },
    {
        position: 80,
        name: "Number of Inquiries",
        length: 10, // n
        dataElementType: DataElementType.Fixed
    },
    {
        position: 81,
        name: "Number of Authorizations",
        length: 10, // n
        dataElementType: DataElementType.Fixed
    },
    {
        position: 82,
        name: "Credits, Processing Fee Amount",
        length: 12, // n
        dataElementType: DataElementType.Fixed
    },
    {
        position: 83,
        name: "Credits, Transaction Fee Amount",
        length: 12, // n
        dataElementType: DataElementType.Fixed
    },
    {
        position: 84,
        name: "Debits, Processing Fee Amount",
        length: 12, // n
        dataElementType: DataElementType.Fixed
    },
    {
        position: 85,
        name: "Debits, Transaction Fee Amount",
        length: 12, // n
        dataElementType: DataElementType.Fixed
    },
    {
        position: 86,
        name: "Total Amount of Credits",
        length: 16, // n
        dataElementType: DataElementType.Fixed
    },
    {
        position: 87,
        name: "Credits, Reversal Amount",
        length: 16, // n
        dataElementType: DataElementType.Fixed
    },
    {
        position: 88,
        name: "Total Amount of Debits",
        length: 16, // n
        dataElementType: DataElementType.Fixed
    },
    {
        position: 89,
        name: "Debits, Reversal Amount",
        length: 16, // n
        dataElementType: DataElementType.Fixed
    },
    {
        position: 90,
        name: "Original Data Elements",
        length: 42, // n
        dataElementType: DataElementType.Fixed
    },
    {
        position: 91,
        name: "File Update Code",
        length: 1, // an
        dataElementType: DataElementType.Fixed
    },
    {
        position: 92,
        name: "File Security Code",
        length: 2, // an
        dataElementType: DataElementType.Fixed
    },
    {
        position: 93,
        name: "Response Indicator",
        length: 5, // an
        dataElementType: DataElementType.Fixed
    },
    {
        position: 94,
        name: "Service Indicator",
        length: 7, // an
        dataElementType: DataElementType.Fixed
    },
    {
        position: 95,
        name: "Replacement Amounts",
        length: 42, // an
        dataElementType: DataElementType.Fixed
    },
    {
        position: 96,
        name: "Message Security Code",
        length: 64, // b
        dataElementType: DataElementType.Fixed
    },
    {
        position: 97,
        name: "Net Settlement Amount",
        length: 16, // x+n 16
        dataElementType: DataElementType.Fixed
    },
    {
        position: 98,
        name: "Payee",
        length: 25, // ans
        dataElementType: DataElementType.Fixed
    },
    {
        position: 99,
        name: "Settlement Institution Identification Code",
        length: 2, // n .. 11
        dataElementType: DataElementType.Variable
    },
    {
        position: 100,
        name: "Receiving Institution Identification Code",
        length: 2, // n .. 11
        dataElementType: DataElementType.Variable
    },
    {
        position: 101,
        name: "File Name",
        length: 2, // ans .. 17
        dataElementType: DataElementType.Variable
    },
    {
        position: 102,
        name: "Account Identification 1",
        length: 2, // ans .. 28
        dataElementType: DataElementType.Variable
    },
    {
        position: 103,
        name: "Account Identification 2",
        length: 2, // ans .. 28
        dataElementType: DataElementType.Variable
    },
    {
        position: 104,
        name: "Transaction Description",
        length: 3, // n .. 100
        dataElementType: DataElementType.Variable
    },
    {
        position: 105,
        name: "Reserved for ISO use",
        length: 3, // n .. 999
        dataElementType: DataElementType.Variable
    },
    {
        position: 106,
        name: "Reserved for ISO use",
        length: 3, // n .. 999
        dataElementType: DataElementType.Variable
    },
    {
        position: 107,
        name: "Reserved for ISO use",
        length: 3, // n .. 999
        dataElementType: DataElementType.Variable
    },
    {
        position: 108,
        name: "Reserved for ISO use",
        length: 3, // n .. 999
        dataElementType: DataElementType.Variable
    },
    {
        position: 109,
        name: "Reserved for ISO use",
        length: 3, // n .. 999
        dataElementType: DataElementType.Variable
    },
    {
        position: 110,
        name: "Reserved for ISO use",
        length: 3, // n .. 999
        dataElementType: DataElementType.Variable
    },
    {
        position: 111,
        name: "Reserved for ISO use",
        length: 3, // n .. 999
        dataElementType: DataElementType.Variable
    },
    {
        position: 112,
        name: "Reserved for national use",
        length: 3, // n .. 999
        dataElementType: DataElementType.Variable
    },
    {
        position: 113,
        name: "Reserved for national use",
        length: 3, // n .. 999
        dataElementType: DataElementType.Variable
    },
    {
        position: 114,
        name: "Reserved for national use",
        length: 3, // n .. 999
        dataElementType: DataElementType.Variable
    },
    {
        position: 115,
        name: "Reserved for national use",
        length: 3, // n .. 999
        dataElementType: DataElementType.Variable
    },
    {
        position: 116,
        name: "Reserved for national use",
        length: 3, // n .. 999
        dataElementType: DataElementType.Variable
    },
    {
        position: 117,
        name: "Reserved for national use",
        length: 3, // n .. 999
        dataElementType: DataElementType.Variable
    },
    {
        position: 118,
        name: "Reserved for national use",
        length: 3, // n .. 999
        dataElementType: DataElementType.Variable
    },
    {
        position: 119,
        name: "Reserved for national use",
        length: 3, // n .. 999
        dataElementType: DataElementType.Variable
    },
    {
        position: 120,
        name: "Reserved for private use",
        length: 3, // n .. 999
        dataElementType: DataElementType.Variable
    },
    {
        position: 121,
        name: "Reserved for private use",
        length: 3, // n .. 999
        dataElementType: DataElementType.Variable
    },
    {
        position: 122,
        name: "Reserved for private use",
        length: 3, // n .. 999
        dataElementType: DataElementType.Variable
    },
    {
        position: 123,
        name: "Reserved for private use",
        length: 3, // n .. 999
        dataElementType: DataElementType.Variable
    },
    {
        position: 124,
        name: "Reserved for private use",
        length: 3, // n .. 999
        dataElementType: DataElementType.Variable
    },
    {
        position: 125,
        name: "Reserved for private use",
        length: 3, // n .. 999
        dataElementType: DataElementType.Variable
    },
    {
        position: 126,
        name: "Reserved for private use",
        length: 3, // n .. 999
        dataElementType: DataElementType.Variable
    },
    {
        position: 127,
        name: "Reserved for private use",
        length: 3, // n .. 999
        dataElementType: DataElementType.Variable
    },
    {
        position: 128,
        name: "Message Authentication Code",
        length: 64, // b
        dataElementType: DataElementType.Fixed
    }
];

/**
 * Convert number to array of bit flag.
 */
let convertToBitArray = (n: number) => {
    let result: boolean[] = [];
    for (var i = 0, v = 8; i < 4; i++) {
        let m = v >> i;
        let b = m & n;
        result[i] = (b != 0) ? true : false;
    }
    return result;
}

let getPresentElements = (bitmap: string) => {
    let b: boolean[] = []; // Each character of the bitmap represents 4 bits
    for (var i = 0; i < bitmap.length; i++) {
        let s = bitmap[i];
        let h = parseInt(s, 16);
        b = b.concat(convertToBitArray(h));
    }
    return b;
}

/**
 * Parse an ISO 8583 message, returning an ISO 8583 object.
 * @param message Complete ISO 8583 message.
 */
let parse = (message: string): ISO8583 => {
    let messageTypeIndicator = message.substring(0, 4);
    let primaryBitmap = message.substring(4, 20); // Primary bitmap always present
    let presentDataElements: boolean[] = [];
    let dataElements: any[] = [];
    let helper = (data: string) => {
        for (var i = 0, start = 0; i < presentDataElements.length; i++) {
            if (!presentDataElements[i]) {
                continue;
            } else {
                let descriptor = dataElementDescriptors[i];
                if (!descriptor) {
                    continue;
                } else {
                    switch (descriptor.dataElementType) {
                        case DataElementType.Fixed:
                            var substring = "";
                            substring = data.substring(start, start + descriptor.length);
                            dataElements.push({
                                position: descriptor.position,
                                data: substring,
                                dataElementType: descriptor.dataElementType
                            });
                            start += descriptor.length;
                            break;
                        case DataElementType.Variable:
                            var length = 0;
                            var substring = "";
                            length = parseInt(data.substring(start, descriptor.length));
                            var startIndex = start + descriptor.length;
                            substring = data.substring(startIndex, startIndex + length);
                            dataElements.push({
                                position: descriptor.position,
                                data: substring,
                                dataElementType: descriptor.dataElementType
                            });
                            start += startIndex + length;
                            break;
                        default:
                            break;
                    }
                }
            }
        }
    }
    presentDataElements = getPresentElements(primaryBitmap);
    if (presentDataElements[0]) {
        // Secondary bitmap present
        let secondaryBitmap = message.substring(20, 36);
        presentDataElements = presentDataElements.concat(getPresentElements(secondaryBitmap));
        helper(message.substring(36));
        return {
            MessageTypeIndicator: messageTypeIndicator,
            PrimaryBitmap: primaryBitmap,
            SecondaryBitmap: secondaryBitmap,
            DataElements: dataElements
        }
    } else {
        helper(message.substring(20));
        return {
            MessageTypeIndicator: messageTypeIndicator,
            PrimaryBitmap: primaryBitmap,
            DataElements: dataElements
        };
    }
}

let generate = (elements: DataElement[]) => {
    var result = "";
    let presentElements: boolean[] = [];
    for (var i = 0; i < 128; i++) {
        presentElements.push(false);
    }
    // TODO: Check for duplicate elements
    elements.forEach(element => {
        // Position is 1-indexed, but the lookup is 0-indexed
        let position = element.position - 1;
        presentElements[position] = true;
        // Secondary bitmap is present
        if (position > 63) {
            presentElements[0] = true;
        }
        let descriptor = dataElementDescriptors[position];
        switch (descriptor.dataElementType) {
            case DataElementType.Fixed:
                // Ensure that value is within range of the spec
                // TODO: Error handling for wrong length
                var value = "";
                if (element.value.length < descriptor.length) {
                    value = element.value;
                } else {
                    element.value.slice(0, descriptor.length);
                }
                result += value
                break;
            case DataElementType.Variable:
                result += element.value.length + element.value;
                break;
        }
    });
    let bitmap = generateBitmap(presentElements);
    return bitmap + result;
}

/**
 * Generates the hex representation of the bitmap corresponding to the bit array.
 */
let generateBitmap = (presentElements: boolean[]) => {
    var result = "";
    let hex: number = 0;
    for (var i = 0, j = 0, x = 0; i < presentElements.length; i += j, hex = 0) {
        for (j = 0, x = 1 << 3; j < 4; j++) {
            if (presentElements[i + j]) {
                hex |= x >> j;
            }
        }
        result += hex.toString(16);
    }
    return result;
}
