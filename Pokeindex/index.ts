import express, { Express, Request, Response } from "express";
import cors from "cors";
import fetch from "cross-fetch";

// Töltsük le a fájlt és szolgáljuk ki, lehessen is kiszűrni

async function run() {
	const app: Express = express();
	app.use(cors());

	app.listen(8000, () => {
		console.log("Server is running");
	});

	const pokeData: Array<any> = (
		await fetch(
			"https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json"
		).then((res) => res.json())
	).pokemon;

	//	összes vagy 10 db pagination-el
	app.get("/all", (req: Request, res: Response) => {
		let page;
		if (req.query.page) page = parseInt(req.query.page.toString());
		const limit = 10;
		const maxPage = Math.ceil(pokeData.length / limit);


		res.json(
			!page
				? {
						maxPage: maxPage,
						pokemons: pokeData,
				  }
				: {
						maxPage: maxPage,
						pokemons: pokeData.slice(
							(page - 1) * limit,
							(page - 1) * limit + limit
						),
				  }
		);
	});

	//	ID szerint keresse ki az adatot!
	app.get("/id/:id", (req, res) => {
		let szurt = pokeData.filter((x) => x.id == req.params.id);
		res.json(szurt);
	});
}

run();
