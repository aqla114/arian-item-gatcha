import { GetStaticProps } from 'next';
import React, { useState } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import Card from '../components/card';
import { getItems } from '../lib/get-items';
import { loadRecipes } from '../lib/load-recipes';
import { Place } from '../types/place';
import { Recipe } from '../types/recipe';

type Props = {
	recipes: Recipe[];
	ingridients: { [k in Place]: Recipe[] };
};

export const getStaticProps: GetStaticProps<Props> = async () => {
	const recipes = loadRecipes();

	// ingridients が空文字列のやつは素材
	const ingridients = recipes.filter((x) => x.ingridients === '');

	const ingridientsProps: { [k in Place]: Recipe[] } = {
		Farm: ingridients.filter((x) => x.getWay.includes('農園')),
		Pond: ingridients.filter((x) => x.getWay.includes('いけす')),
		Cave: ingridients.filter((x) => x.getWay.includes('洞窟')),
		Forest: ingridients.filter((x) => x.getWay.includes('旧校舎裏の林')),
	};

	console.log(ingridientsProps);

	return {
		props: {
			recipes,
			ingridients: ingridientsProps,
		},
	};
};

export default function Home({ recipes, ingridients }: Props) {
	const [items, setItems] = useState<Recipe[]>([]);
	const [currentPlace, setCurrentPlace] = useState<Place>('Farm');
	const [diceCount, setDiceCount] = useState<number>(1);

	return (
		<div className="container">
			<div className="gatcha">
				<select
					className="gatcha-type-selector"
					onChange={(e) => setCurrentPlace(e.target.value as Place)}
				>
					<option value="Farm">農園</option>
					<option value="Pond">いけす</option>
					<option value="Cave">洞窟</option>
					<option value="Forest">旧校舎裏の林</option>
				</select>
				<select
					className="gatcha-dice-count-selector"
					onChange={(e) => setDiceCount(parseInt(e.target.value))}
				>
					<option value={1}>1D6</option>
					<option value={2}>2D6</option>
					<option value={3}>3D6</option>
					<option value={4}>4D6</option>
				</select>
				<input
					type="button"
					className="gatcha-button"
					value="回す"
					onClick={() =>
						setItems(getItems(ingridients[currentPlace], diceCount))
					}
				/>
			</div>
			<div className="items-container">
				<CSSTransitionGroup
					transitionName="example"
					transitionAppear={true}
					transitionLeave={false}
					transitionEnter={true}
					transitionAppearTimeout={500}
					transitionEnterTimeout={500}
				>
					{items.map((item, idx) => (
						<Card key={`${item.id}${idx}`} item={item} idx={idx} />
					))}
				</CSSTransitionGroup>
			</div>

			<style>{`
          .gatcha-type-selector {
            margin: 8px;
          }

          .gatcha-dice-count-selector {
            margin: 8px;
          }

          .gatcha-button {
            margin: 8px;
          }

          .items-container {
            back-ground-color: cornsilk;
            width: 1214px;
            margin: 20px;
		  }

		  .example-enter {
			opacity: 0.01;
		  }

		  .example-enter.example-enter-active {
			opacity: 1;
			transition: opacity 500ms ease-in;
		  }
        `}</style>
		</div>
	);
}
