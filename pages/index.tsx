import { GetStaticProps } from 'next';
import React, { useEffect, useState } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import Card from '../components/card';
import { getItems } from '../lib/get-items';
import { getRecipes } from '../lib/get-recipes';
import { loadRecipes } from '../lib/load-recipes';
import { Place } from '../types/place';
import { Recipe } from '../types/recipe';

type Props = {
	env: {
		HOST_NAME: string;
	};
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
		Library: recipes,
	};

	console.log(ingridientsProps);

	console.log(process.env);

	return {
		props: {
			env: {
				HOST_NAME: process.env.HOST_NAME || '',
			},
			ingridients: ingridientsProps,
		},
	};
};

export default function Home({ ingridients, env }: Props) {
	const [items, setItems] = useState<Recipe[]>([]);
	const [currentPlace, setCurrentPlace] = useState<Place | 'Library'>('Farm');
	const [diceCount, setDiceCount] = useState<number>(1);
	const [knownIds, setKnownIds] = useState<number[]>([]);

	useEffect(() => {
		fetch(`http://${env.HOST_NAME}/api/item-pool`, {
			method: 'GET',
		})
			.then(async (res) => {
				const resIds: number[] = (await res.json())['ids'];
				console.log(resIds);
				setKnownIds(resIds);
			})
			.catch((e) => console.log(e));
	}, []);

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
					<option value="Library">図書館</option>
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
					onClick={() => {
						const items =
							currentPlace === 'Library'
								? getRecipes(
										ingridients[currentPlace].filter(
											(x) => !knownIds.includes(x.id)
										),
										diceCount
								  )
								: getItems(ingridients[currentPlace], diceCount);

						fetch(`http://${env.HOST_NAME}/api/item-pool`, {
							method: 'POST',
							headers: { 'Content-Type': 'application/json' },
							body: JSON.stringify({ ids: items.map((x) => x.id) }),
						})
							.then(async (res) => {
								const resIds: number[] = (await res.json())['ids'];
								console.log('Response known ids', resIds);
								setKnownIds(resIds);
								setItems(items);
							})
							.catch((e) => console.log(e));
					}}
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
