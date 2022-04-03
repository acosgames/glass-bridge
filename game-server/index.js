import cup from './acosg';
import GlassBridge from './game';


cup.on('gamestart', (action) => GlassBridge.onNewGame(action));
cup.on('skip', (action) => GlassBridge.onSkip(action));
cup.on('join', (action) => GlassBridge.onJoin(action));
cup.on('leave', (action) => GlassBridge.onLeave(action));
cup.on('pick', (action) => GlassBridge.onPick(action));

cup.submit();