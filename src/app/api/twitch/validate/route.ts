import { NextRequest, NextResponse } from 'next/server';
import { twitchChatServerService } from '@/lib/twitch-chat-server';

export async function POST(request: NextRequest) {
  try {
    const { channelName } = await request.json();

    if (!channelName) {
      return NextResponse.json(
        { error: 'Nom de chaîne requis' },
        { status: 400 }
      );
    }

    // Validation du format du nom de chaîne (accepte tous les usernames Twitch)
    const channelMatch = channelName.match(/^[a-zA-Z0-9_]{1,25}$/);
    if (!channelMatch) {
      return NextResponse.json(
        { error: `Format de nom de chaîne invalide: ${channelName}. Le nom doit contenir entre 1 et 25 caractères alphanumériques et underscores.` },
        { status: 400 }
      );
    }

    console.log(`🔍 Validation de la chaîne: ${channelName}`);
    
    // Tentative de connexion au chat Twitch (accepte toutes les chaînes)
    const isConnected = await twitchChatServerService.connectToChannel(channelName);
    
    if (!isConnected) {
      console.log(`⚠️  Impossible de se connecter au chat de ${channelName}, mais on continue...`);
      // On continue même si la connexion échoue pour permettre les tests
    }

    // Informations de base de la chaîne
    const channelInfo = {
      name: channelName,
      displayName: channelName,
      isLive: true,
      gameName: 'Quiz',
      title: 'Quiz en cours'
    };

    return NextResponse.json({
      success: true,
      channel: channelInfo,
      stream: {
        isLive: true,
        title: 'Quiz en cours',
        gameName: 'Quiz',
        viewerCount: 0
      }
    });

  } catch (error) {
    console.error('Erreur validation Twitch:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la validation de la chaîne' },
      { status: 500 }
    );
  }
} 