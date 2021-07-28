import dotenv from 'dotenv';
dotenv.config();

export default {
    port: process.env.PORT, //5000
    host: process.env.HOST, //'localhost'
    dbUri: process.env.BLOG_DATABASE_URI, //'mongodb://localhost:27017/rest-api'
    saltWorkFactor: 10,
    accessTokenTtl: '15m',
    refreshTokenTtl: '1y',
    privateKey: `-----BEGIN RSA PRIVATE KEY-----
    MIICXQIBAAKBgQCE4RnepVRLL9IqCPVWJgvUs4bLLiFcBJV32Fk7CdJRr+Ubl3Rb
    CXk8DzkY3sZR5pVCFrYblW/2OYdrdvXmYRBIgvh8JLFMYoAKSDNOfmXP6DCvs+sO
    WxgauzWFXvDzPDQDKVzF2H3Y5LmgGStmamIG5xoF4mt6Xa1TwLOeTSYrGwIDAQAB
    AoGAW1AE4wdiAbj/B3vYfDbw8l3cR0uQCRftTsoRp4x8Rz5Ehs1xXA4Kjcc4SWrt
    heKatyu8QQBUTDQEZ0j8ejBBa1BUUcRnAroL2RyEQLB8wXIDtUrX7hPmbUfZFZS2
    I8n9DYFg2QEY/c4Ekrhi4kBMRCXWiVVnJEP659N3vW033QECQQDhgez2wfPrDyGU
    F+0Hb5tvBHjqCZG4r0lhbUtKx5ZenSEVGoYMcnfucY6AGLw/MJ5Yv1OBFtQyh9b4
    8YRrjm77AkEAltjLqB8CDv5iu6ARsqOco+PBBGwt9s7D8gpz48Fb9JJzxC/oyvbm
    DKoQBgtClPnEfnflctvEjPeglAKrjdf6YQJBAJhuxssV19dwZvZAJgz8uEiW8VTi
    GwqIEkY1Jsvplg9mj1JAl5QaXE9lmzmjfrwIFUFQMxXzZISzpfCo8SXzJbkCQGbt
    etk2f0MX1OrNaAYKmaFCkLuhzSMxJoaLF1R65XHWVGOzhRaorYRKrjBRkpbwbmEV
    ElzzFARUGx+jSse4bUECQQDR6QQhtHHwxw6aglGJLo2QegRq2nALsCYQJZkUt0S8
    A1U648OiZpL9auKQMHXQt948L1PhEFxLPCKtgh763v6M
    -----END RSA PRIVATE KEY-----`
}