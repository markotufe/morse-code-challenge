import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  // console.log(req.headers.authorization);//ovde se nalazi token iz request-a
  const authHeader = req.headers.authorization;

  //moramo proveriti da li token pocinje sa Bearer razmak!!!!!!
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "Please provide token",
    });
  }

  //uzimamo token, splitujemo u array, imamo ['Bearer', '12312412'] i uzimamo token string
  const token = authHeader.split(" ")[1];
  // console.log(token);

  //provera da li je token validan
  try {
    //ako je token validan, svi podaci se nalaze u decoded, a koji su to podaci? pa to su podaci koje smo postavili u payload kada smo kreirali token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);

    const { id, username } = decoded;

    //req.user je polje koje sami postavljamo i bice dostupno svuda unutar aplikacije
    req.user = { id, username };
    next(); //ako je sve ok da odemo na sledeci middleware, a to je getMorseOutput controller
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

export default authMiddleware;
