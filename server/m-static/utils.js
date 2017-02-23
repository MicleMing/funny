/**
 * @file util
 * @author lanmingming
 */

//   - The first 500 bytes (byte offsets 0-499, inclusive):  bytes=0-
//     499
//   - The second 500 bytes (byte offsets 500-999, inclusive):
//     bytes=500-999
//   - The final 500 bytes (byte offsets 9500-9999, inclusive):
//     bytes=-500
//   - Or bytes=9500-
//   - The first and last bytes only (bytes 0 and 9999):  bytes=0-0,-1
//   - Several legal but not canonical specifications of the second 500
//     bytes (byte offsets 500-999, inclusive):
//         bytes=500-600,601-999
//         bytes=500-700,601-999

exports.parseRange = (size, rawRange) => {

    if (!rawRange) {
        return undefined;
    }

    let range = rawRange.substring(6).split('-');
    let start = parseInt(range[0], 10);
    let end = parseInt(range[1], 10);
    let valid = true;

    // -500
    if (isNaN(start)) {
        start = size - end;
        end = size - 1;
    }
    // 500-
    if (isNaN(end)) {
        end = size - 1;
    }

    if (isNaN(start) && isNaN(end)) {
        valid = false;
    }

    return valid ? {
        start: start,
        end: end
    } : undefined;
};

exports.etag = stat => `"${stat.size}-${Number(stat.mtime)}"`;
