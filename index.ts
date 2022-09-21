interface ISO8583 {
    messageTypeIndicator: string;
    primaryBitmap: string;
    secondaryBitmap?: string;
    dataElements: DataElement[];
}

interface DataElementDescriptor {
    position: number;
    name: string;
    dataElementLength: DataElementLength;
    dataElementType: DataElementType;

    /**
     * For variable length elements, identifies the number of characters defining length (min = 2 if length < 100, min = 3 if length < 1000).
     * 
     * For fixed length elements, identifies the number of characters in that elements.
     */
    min: number;

    /**
     * For variable length elements, identifies max number of characters for the element.
     * 
     * Not used for fixed length elements.
     */
    max?: number;
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
enum DataElementLength {
    Default,
    Fixed,
    Variable
}

enum DataElementType {
    Alpha,
    Numeric,
    XNumeric, // Numeric; first byte indicates whether Credit or Debit (C or D)
    Special, // Special characters only
    AlphaNumeric,
    AlphaSpecial,
    NumericSpecial,
    AlphaNumericSpecial,
    AlphaNumericPad,
    Binary,
    Pad,
    Track, // Track 2 and 3 character set ISO/IEC 7813 and ISO/IEC 4909 respectively
}

let dataElementDescriptors: DataElementDescriptor[] = [
    {
        position: 1,
        name: "Bitmap",
        min: -1,
        dataElementLength: DataElementLength.Default,
        dataElementType: DataElementType.Binary
    },
    {
        position: 2,
        name: "Primary Account Number",
        min: 2,
        dataElementLength: DataElementLength.Variable,
        dataElementType: DataElementType.Numeric
    },
    {
        position: 3,
        name: "Processing Code",
        min: 6,
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.Numeric
    },
    {
        position: 4,
        name: "Amount, Transaction",
        min: 12,
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.Numeric
    },
    {
        position: 5,
        name: "Amount, Settlement",
        min: 12,
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.Numeric
    },
    {
        position: 6,
        name: "Amount, Cardholder Billing",
        min: 12,
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.Numeric
    },
    {
        position: 7,
        name: "Transmission Date & Time",
        min: 10,
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.Numeric
    },
    {
        position: 8,
        name: "Amount, Cardholder Bill Fee",
        min: 8,
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.Numeric
    },
    {
        position: 9,
        name: "Conversion Rate, Settlement",
        min: 8,
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.Numeric
    },
    {
        position: 10,
        name: "Conversion Rate, Cardholder Billing",
        min: 8,
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.Numeric
    },
    {
        position: 11,
        name: "System Trace Audit Number", // STAN
        min: 6,
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.Numeric
    },
    {
        position: 12,
        name: "Local Transaction Time (hhmmss)",
        min: 6,
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.Numeric
    },
    {
        position: 13,
        name: "Local Transaction Date (MMDD)",
        min: 4,
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.Numeric
    },
    {
        position: 14,
        name: "Expiration Date (YYMM)",
        min: 4,
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.Numeric
    },
    {
        position: 15,
        name: "Settlement Date",
        min: 4,
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.Numeric
    },
    {
        position: 16,
        name: "Currency Conversion Date",
        min: 4,
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.Numeric
    },
    {
        position: 17,
        name: "Capture Date",
        min: 4,
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.Numeric
    },
    {
        position: 18,
        name: "Merchant Type, or Merchant Category Code",
        min: 4,
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.Numeric
    },
    {
        position: 19,
        name: "Acquiring Institution (Country Code)",
        min: 3,
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.Numeric
    },
    {
        position: 20,
        name: "PAN Extended (Country Code)",
        min: 3,
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.Numeric
    },
    {
        position: 21,
        name: "Forwarding Institution (Country Code)",
        min: 3,
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.Numeric
    },
    {
        position: 22,
        name: "Point of Service Entry Mode",
        min: 12,
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.Numeric
    },
    {
        position: 23,
        name: "Application PAN Sequence Number",
        min: 3,
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.Numeric
    },
    {
        position: 24,
        name: "Function Code (ISO 8583: 1993), or Network International Identifier", // NII
        min: 3,
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.Numeric
    },
    {
        position: 25,
        name: "Point of Service Condition Code",
        min: 2,
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.Numeric
    },
    {
        position: 26,
        name: "Point of Service Capture Code",
        min: 2,
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.Numeric
    },
    {
        position: 27,
        name: "Authorizing Identification Response Length",
        min: 1,
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.Numeric
    },
    {
        position: 28,
        name: "Amount, Transaction Fee",
        min: 8, // x+n
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.XNumeric
    },
    {
        position: 29,
        name: "Amount, Settlement Fee",
        min: 8, // x+n
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.XNumeric
    },
    {
        position: 30,
        name: "Amount, Transaction Processing Fee",
        min: 8, // x+n
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.XNumeric
    },
    {
        position: 31,
        name: "Amount, Settlement Processing Fee",
        min: 8, // x+n
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.XNumeric
    },
    {
        position: 32,
        name: "Acquiring Institution Identification Code",
        min: 11, // Variable to 11
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.Numeric
    },
    {
        position: 33,
        name: "Forwarding Institution Identification Code",
        min: 2, // Variable to 11
        max: 11,
        dataElementLength: DataElementLength.Variable,
        dataElementType: DataElementType.Numeric
    },
    {
        position: 34,
        name: "Primary Account Number, Extended",
        min: 2, // ns .. 28
        max: 28,
        dataElementLength: DataElementLength.Variable,
        dataElementType: DataElementType.NumericSpecial
    },
    {
        position: 35,
        name: "Track 2 Data",
        min: 2, // z .. 37
        max: 37,
        dataElementLength: DataElementLength.Variable,
        dataElementType: DataElementType.Track
    },
    {
        position: 36,
        name: "Track 3 Data",
        min: 3, // n .. 104
        max: 104,
        dataElementLength: DataElementLength.Variable,
        dataElementType: DataElementType.Numeric
    },
    {
        position: 37,
        name: "Retrieval Reference Number",
        min: 12, // an
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.AlphaNumeric
    },
    {
        position: 38,
        name: "Authorization Identification Response",
        min: 6, // an
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.AlphaNumeric
    },
    {
        position: 39,
        name: "Response Code",
        min: 2, // AN
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.AlphaNumeric
    },
    {
        position: 40,
        name: "Service Restriction Code",
        min: 3,
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.AlphaNumeric
    },
    {
        position: 41,
        name: "Card Acceptor Terminal Identification",
        min: 8, // ans
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.AlphaNumericSpecial
    },
    {
        position: 42,
        name: "Card Acceptor Identification Code",
        min: 15,
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.AlphaNumericSpecial
    },
    {
        position: 43,
        name: "Card Acceptor Name/Location ((1-23 street address, -36 city, -38 state, 39-40 country)",
        min: 40,
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.AlphaNumericSpecial
    },
    {
        position: 44,
        name: "Additional Response Data",
        min: 2, // an .. 25
        max: 25,
        dataElementLength: DataElementLength.Variable,
        dataElementType: DataElementType.AlphaNumeric
    },
    {
        position: 45,
        name: "Track 1 Data",
        min: 2, // an .. 76
        max: 76,
        dataElementLength: DataElementLength.Variable,
        dataElementType: DataElementType.AlphaNumeric
    },
    {
        position: 46,
        name: "Additional Data (ISO)",
        min: 3, // an ... 999
        max: 999,
        dataElementLength: DataElementLength.Variable,
        dataElementType: DataElementType.AlphaNumeric
    },
    {
        position: 47,
        name: "Additional Data (National)",
        min: 3, // an ... 999
        max: 999,
        dataElementLength: DataElementLength.Variable,
        dataElementType: DataElementType.AlphaNumeric
    },
    {
        position: 48,
        name: "Additional Data (Private)",
        min: 3, // an ... 999
        max: 999,
        dataElementLength: DataElementLength.Variable,
        dataElementType: DataElementType.AlphaNumeric
    },
    {
        position: 49,
        name: "Currency Code, Transaction",
        min: 3, // a or n
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.AlphaNumeric
    },
    {
        position: 50,
        name: "Currency Code, Settlement",
        min: 3, // a or n
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.AlphaNumeric
    },
    {
        position: 51,
        name: "Currency Code, Cardholder Billing",
        min: 3, // a or n
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.AlphaNumeric
    },
    {
        position: 52,
        name: "Personal Identification Number Data",
        min: 64, // b
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.Binary
    },
    {
        position: 53,
        name: "Security Related Control Information",
        min: 16, // n
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.Numeric
    },
    {
        position: 54,
        name: "Additional Amounts",
        min: 3, // an ... 120
        max: 120,
        dataElementLength: DataElementLength.Variable,
        dataElementType: DataElementType.AlphaNumeric
    },
    {
        position: 55,
        name: "ICC Data - EMV Having Multiple Tags",
        min: 3, // an ... 999
        max: 999,
        dataElementLength: DataElementLength.Variable,
        dataElementType: DataElementType.AlphaNumericSpecial
    },
    {
        position: 56,
        name: "Reserved (ISO)",
        min: 3, // ans ... 999
        max: 999,
        dataElementLength: DataElementLength.Variable,
        dataElementType: DataElementType.AlphaNumericSpecial
    },
    {
        position: 57,
        name: "Reserved (National)",
        min: 3, // ans ... 999
        max: 999,
        dataElementLength: DataElementLength.Variable,
        dataElementType: DataElementType.AlphaNumericSpecial
    },
    {
        position: 58,
        name: "Reserved (National)",
        min: 3, // ans ... 999
        max: 999,
        dataElementLength: DataElementLength.Variable,
        dataElementType: DataElementType.AlphaNumericSpecial
    },
    {
        position: 59,
        name: "Reserved (National)",
        min: 3, // ans ... 999
        max: 999,
        dataElementLength: DataElementLength.Variable,
        dataElementType: DataElementType.AlphaNumericSpecial
    },
    {
        position: 60,
        name: "Reserved (Private)",
        min: 3, // ans ... 999
        max: 999,
        dataElementLength: DataElementLength.Variable,
        dataElementType: DataElementType.AlphaNumericSpecial
    },
    {
        position: 61,
        name: "Reserved (Private)",
        min: 3, // ans ... 999
        max: 999,
        dataElementLength: DataElementLength.Variable,
        dataElementType: DataElementType.AlphaNumericSpecial
    },
    {
        position: 62,
        name: "Reserved (National)",
        min: 3, // ans ... 999
        max: 999,
        dataElementLength: DataElementLength.Variable,
        dataElementType: DataElementType.AlphaNumericSpecial
    },
    {
        position: 63,
        name: "Reserved (National)",
        min: 3, // ans ... 999
        max: 999,
        dataElementLength: DataElementLength.Variable,
        dataElementType: DataElementType.AlphaNumericSpecial
    },
    {
        position: 64,
        name: "Message Authentication Code",
        min: 64, // b
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.Binary
    },
    {
        position: 65,
        name: "Extended Bitmap Indicator",
        min: 1, // b
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.Binary
    },
    {
        position: 66,
        name: "Settlement Code",
        min: 1, // n
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.Numeric
    },
    {
        position: 67,
        name: "Extended Payment Code",
        min: 2, // n
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.Numeric
    },
    {
        position: 68,
        name: "Receiving Institution Country Code",
        min: 3, // n
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.Numeric
    },
    {
        position: 69,
        name: "Settlement Institution Country Code",
        min: 3, // n
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.Numeric
    },
    {
        position: 70,
        name: "Network Management Information Code",
        min: 3, // n
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.Numeric
    },
    {
        position: 71,
        name: "Message Number",
        min: 4, // n
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.Numeric
    },
    {
        position: 72,
        name: "Last Message's Number",
        min: 4, // n
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.Numeric
    },
    {
        position: 73,
        name: "Action Date (YYMMDD)",
        min: 6, // n
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.Numeric
    },
    {
        position: 74,
        name: "Number of Credits",
        min: 10, // n
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.Numeric
    },
    {
        position: 75,
        name: "Credits, Reversal Number",
        min: 10, // n
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.Numeric
    },
    {
        position: 76,
        name: "Number of Debits",
        min: 10, // n
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.Numeric
    },
    {
        position: 77,
        name: "Debits, Reversal Number",
        min: 10, // n
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.Numeric
    },
    {
        position: 78,
        name: "Transfer Number",
        min: 10, // n
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.Numeric
    },
    {
        position: 79,
        name: "Transfer, Reversal Number",
        min: 10, // n
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.Numeric
    },
    {
        position: 80,
        name: "Number of Inquiries",
        min: 10, // n
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.Numeric
    },
    {
        position: 81,
        name: "Number of Authorizations",
        min: 10, // n
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.Numeric
    },
    {
        position: 82,
        name: "Credits, Processing Fee Amount",
        min: 12, // n
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.Numeric
    },
    {
        position: 83,
        name: "Credits, Transaction Fee Amount",
        min: 12, // n
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.Numeric
    },
    {
        position: 84,
        name: "Debits, Processing Fee Amount",
        min: 12, // n
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.Numeric
    },
    {
        position: 85,
        name: "Debits, Transaction Fee Amount",
        min: 12, // n
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.Numeric
    },
    {
        position: 86,
        name: "Total Amount of Credits",
        min: 16, // n
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.Numeric
    },
    {
        position: 87,
        name: "Credits, Reversal Amount",
        min: 16, // n
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.Numeric
    },
    {
        position: 88,
        name: "Total Amount of Debits",
        min: 16, // n
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.Numeric
    },
    {
        position: 89,
        name: "Debits, Reversal Amount",
        min: 16, // n
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.Numeric
    },
    {
        position: 90,
        name: "Original Data Elements",
        min: 42, // n
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.Numeric
    },
    {
        position: 91,
        name: "File Update Code",
        min: 1, // an
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.AlphaNumeric
    },
    {
        position: 92,
        name: "File Security Code",
        min: 2, // an
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.AlphaNumeric
    },
    {
        position: 93,
        name: "Response Indicator",
        min: 5, // an
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.AlphaNumeric
    },
    {
        position: 94,
        name: "Service Indicator",
        min: 7, // an
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.AlphaNumeric
    },
    {
        position: 95,
        name: "Replacement Amounts",
        min: 42, // an
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.AlphaNumeric
    },
    {
        position: 96,
        name: "Message Security Code",
        min: 64, // b
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.Binary
    },
    {
        position: 97,
        name: "Net Settlement Amount",
        min: 16, // x+n 16
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.XNumeric
    },
    {
        position: 98,
        name: "Payee",
        min: 25, // ans
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.AlphaNumericSpecial
    },
    {
        position: 99,
        name: "Settlement Institution Identification Code",
        min: 2, // n .. 11
        max: 11,
        dataElementLength: DataElementLength.Variable,
        dataElementType: DataElementType.Numeric
    },
    {
        position: 100,
        name: "Receiving Institution Identification Code",
        min: 2, // n .. 11
        max: 11,
        dataElementLength: DataElementLength.Variable,
        dataElementType: DataElementType.Numeric
    },
    {
        position: 101,
        name: "File Name",
        min: 2, // ans .. 17
        max: 17,
        dataElementLength: DataElementLength.Variable,
        dataElementType: DataElementType.AlphaNumericSpecial
    },
    {
        position: 102,
        name: "Account Identification 1",
        min: 2, // ans .. 28
        max: 28,
        dataElementLength: DataElementLength.Variable,
        dataElementType: DataElementType.AlphaNumericSpecial
    },
    {
        position: 103,
        name: "Account Identification 2",
        min: 2, // ans .. 28
        max: 28,
        dataElementLength: DataElementLength.Variable,
        dataElementType: DataElementType.AlphaNumericSpecial
    },
    {
        position: 104,
        name: "Transaction Description",
        min: 3, // n .. 100
        max: 100,
        dataElementLength: DataElementLength.Variable,
        dataElementType: DataElementType.AlphaNumericSpecial
    },
    {
        position: 105,
        name: "Reserved for ISO use",
        min: 3, // n .. 999
        max: 999,
        dataElementLength: DataElementLength.Variable,
        dataElementType: DataElementType.AlphaNumericSpecial
    },
    {
        position: 106,
        name: "Reserved for ISO use",
        min: 3, // n .. 999
        max: 999,
        dataElementLength: DataElementLength.Variable,
        dataElementType: DataElementType.AlphaNumericSpecial
    },
    {
        position: 107,
        name: "Reserved for ISO use",
        min: 3, // n .. 999
        max: 999,
        dataElementLength: DataElementLength.Variable,
        dataElementType: DataElementType.AlphaNumericSpecial
    },
    {
        position: 108,
        name: "Reserved for ISO use",
        min: 3, // n .. 999
        max: 999,
        dataElementLength: DataElementLength.Variable,
        dataElementType: DataElementType.AlphaNumericSpecial
    },
    {
        position: 109,
        name: "Reserved for ISO use",
        min: 3, // n .. 999
        max: 999,
        dataElementLength: DataElementLength.Variable,
        dataElementType: DataElementType.AlphaNumericSpecial
    },
    {
        position: 110,
        name: "Reserved for ISO use",
        min: 3, // n .. 999
        max: 999,
        dataElementLength: DataElementLength.Variable,
        dataElementType: DataElementType.AlphaNumericSpecial
    },
    {
        position: 111,
        name: "Reserved for ISO use",
        min: 3, // n .. 999
        max: 999,
        dataElementLength: DataElementLength.Variable,
        dataElementType: DataElementType.AlphaNumericSpecial
    },
    {
        position: 112,
        name: "Reserved for national use",
        min: 3, // n .. 999
        max: 999,
        dataElementLength: DataElementLength.Variable,
        dataElementType: DataElementType.AlphaNumericSpecial
    },
    {
        position: 113,
        name: "Reserved for national use",
        min: 3, // n .. 999
        max: 999,
        dataElementLength: DataElementLength.Variable,
        dataElementType: DataElementType.AlphaNumericSpecial
    },
    {
        position: 114,
        name: "Reserved for national use",
        min: 3, // n .. 999
        max: 999,
        dataElementLength: DataElementLength.Variable,
        dataElementType: DataElementType.AlphaNumericSpecial
    },
    {
        position: 115,
        name: "Reserved for national use",
        min: 3, // n .. 999
        max: 999,
        dataElementLength: DataElementLength.Variable,
        dataElementType: DataElementType.AlphaNumericSpecial
    },
    {
        position: 116,
        name: "Reserved for national use",
        min: 3, // n .. 999
        max: 999,
        dataElementLength: DataElementLength.Variable,
        dataElementType: DataElementType.AlphaNumericSpecial
    },
    {
        position: 117,
        name: "Reserved for national use",
        min: 3, // n .. 999
        max: 999,
        dataElementLength: DataElementLength.Variable,
        dataElementType: DataElementType.AlphaNumericSpecial
    },
    {
        position: 118,
        name: "Reserved for national use",
        min: 3, // n .. 999
        max: 999,
        dataElementLength: DataElementLength.Variable,
        dataElementType: DataElementType.AlphaNumericSpecial
    },
    {
        position: 119,
        name: "Reserved for national use",
        min: 3, // n .. 999
        max: 999,
        dataElementLength: DataElementLength.Variable,
        dataElementType: DataElementType.AlphaNumericSpecial
    },
    {
        position: 120,
        name: "Reserved for private use",
        min: 3, // n .. 999
        max: 999,
        dataElementLength: DataElementLength.Variable,
        dataElementType: DataElementType.AlphaNumericSpecial
    },
    {
        position: 121,
        name: "Reserved for private use",
        min: 3, // n .. 999
        max: 999,
        dataElementLength: DataElementLength.Variable,
        dataElementType: DataElementType.AlphaNumericSpecial
    },
    {
        position: 122,
        name: "Reserved for private use",
        min: 3, // n .. 999
        max: 999,
        dataElementLength: DataElementLength.Variable,
        dataElementType: DataElementType.AlphaNumericSpecial
    },
    {
        position: 123,
        name: "Reserved for private use",
        min: 3, // n .. 999
        max: 999,
        dataElementLength: DataElementLength.Variable,
        dataElementType: DataElementType.AlphaNumericSpecial
    },
    {
        position: 124,
        name: "Reserved for private use",
        min: 3, // n .. 999
        max: 999,
        dataElementLength: DataElementLength.Variable,
        dataElementType: DataElementType.AlphaNumericSpecial
    },
    {
        position: 125,
        name: "Reserved for private use",
        min: 3, // n .. 999
        max: 999,
        dataElementLength: DataElementLength.Variable,
        dataElementType: DataElementType.AlphaNumericSpecial
    },
    {
        position: 126,
        name: "Reserved for private use",
        min: 3, // n .. 999
        max: 999,
        dataElementLength: DataElementLength.Variable,
        dataElementType: DataElementType.AlphaNumericSpecial
    },
    {
        position: 127,
        name: "Reserved for private use",
        min: 3, // n .. 999
        max: 999,
        dataElementLength: DataElementLength.Variable,
        dataElementType: DataElementType.AlphaNumericSpecial
    },
    {
        position: 128,
        name: "Message Authentication Code",
        min: 64, // b
        dataElementLength: DataElementLength.Fixed,
        dataElementType: DataElementType.Binary
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
                    switch (descriptor.dataElementLength) {
                        case DataElementLength.Fixed:
                            var substring = "";
                            substring = data.substring(start, start + descriptor.min);
                            dataElements.push({
                                position: descriptor.position,
                                data: substring,
                                dataElementType: descriptor.dataElementLength
                            });
                            start += descriptor.min;
                            break;
                        case DataElementLength.Variable:
                            var length = 0;
                            var substring = "";
                            length = parseInt(data.substring(start, descriptor.min));
                            var startIndex = start + descriptor.min;
                            substring = data.substring(startIndex, startIndex + length);
                            dataElements.push({
                                position: descriptor.position,
                                data: substring,
                                dataElementType: descriptor.dataElementLength
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
            messageTypeIndicator: messageTypeIndicator,
            primaryBitmap: primaryBitmap,
            secondaryBitmap: secondaryBitmap,
            dataElements: dataElements
        }
    } else {
        helper(message.substring(20));
        return {
            messageTypeIndicator: messageTypeIndicator,
            primaryBitmap: primaryBitmap,
            dataElements: dataElements
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
        if (position > 127) {
            // Somehow got invalid position value. Throw error or something
            return;
        }
        presentElements[position] = true;
        // Secondary bitmap is present
        if (position > 63) {
            presentElements[0] = true;
        }
        let descriptor = dataElementDescriptors[position];
        switch (descriptor.dataElementLength) {
            case DataElementLength.Fixed:
                // Ensure that value is within range of the spec
                // TODO: Error handling for wrong length
                var value = "";
                if (element.value.length < descriptor.min) {
                    value = element.value;
                } else {
                    value = element.value.slice(0, descriptor.min);
                }
                result += value
                break;
            case DataElementLength.Variable:
                result += element.value.length + element.value;
                break;
        }
    });
    if (!presentElements[0]) {
        presentElements = presentElements.slice(0, 63);
    }
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
