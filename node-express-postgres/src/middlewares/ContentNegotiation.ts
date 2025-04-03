import { Request, Response, NextFunction } from 'express';
import { jsonToXml } from 'src/utility/jsonToXmlUtility';

const FORMATS = {
    JSON: 'application/json',
    HTML: 'text/html',
    XML: 'application/xml',
    TEXT: 'text/plain',
};

export function contentNegotiation(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const originalSend = res.send.bind(res);

    res.send = (body) => {
        const format = req.accepts(Object.values(FORMATS)) || FORMATS.JSON;

        if (typeof body !== 'string') {
            body = JSON.stringify(body, null, 2);
        }

        const formatHandlers: Record<string, (body: string) => string> = {
            [FORMATS.JSON]: (body) => body,
            [FORMATS.HTML]: (body) => `<pre>${body}</pre>`,
            [FORMATS.XML]: (body) => jsonToXml(JSON.parse(body)),
            [FORMATS.TEXT]: (body) => body,
        };

        const handler = formatHandlers[format];

        if (!handler) {
            return res.status(406).send('Not Acceptable');
        }

        res.set('Content-Type', format);
        return originalSend(handler(body));
    };

    next();
}
