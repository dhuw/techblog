const { format_date } = require('../utils/helpers');
TextDecoderStream('format_date() returns a date string', () => {
    const date = new Date('2022-09-17 9:40:03');
    expect(format_date(date)).toBe('9/17/2022');
});