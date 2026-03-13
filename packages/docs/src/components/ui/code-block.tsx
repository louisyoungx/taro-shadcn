import { View, Text } from '@tarojs/components'
import { useMemo } from 'react'
import { Copy } from 'lucide-react-taro'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import Taro from '@tarojs/taro'
import type { FC } from 'react'

type TokenType =
    | 'keyword'
    | 'string'
    | 'comment'
    | 'number'
    | 'function'
    | 'tag'
    | 'attr'
    | 'operator'
    | 'plain'

interface Token {
    type: TokenType
    content: string
}

const RULES: { type: TokenType; regex: RegExp }[] = (
    [
        { type: 'comment', regex: /\/\/.*/ },
        { type: 'comment', regex: /\/\*[\s\S]*?\*\// },
        {
            type: 'string',
            regex: /"(?:\\.|[^\\"])*"|'(?:\\.|[^\\'])*'|`(?:\\.|[^\\`])*`/,
        },
        {
            type: 'keyword',
            regex: /\b(?:import|from|export|default|const|let|var|function|return|if|else|switch|case|break|continue|for|while|do|try|catch|finally|throw|new|this|super|class|extends|implements|interface|type|enum|namespace|as|async|await|yield|void|delete|typeof|instanceof|in|of|null|undefined|true|false)\b/,
        },
        { type: 'number', regex: /\b\d+(\.\d+)?\b/ },
        { type: 'tag', regex: /<\/?[a-zA-Z][a-zA-Z0-9]*\b/ },
        { type: 'attr', regex: /\b[a-z][a-z0-9]*(?==)/i },
        { type: 'function', regex: /\b[a-zA-Z_$][a-zA-Z0-9_$]*(?=\s*\()/ },
        { type: 'operator', regex: /[+\-*/%=<>!&|^~]/ },
    ] as { type: TokenType; regex: RegExp }[]
).map(rule => ({
    ...rule,
    regex: new RegExp(rule.regex.source, (rule.regex.flags || '') + 'y'),
}))

function tokenize(code: string): Token[] {
    const tokens: Token[] = []
    let lastIndex = 0

    while (lastIndex < code.length) {
        let matchFound = false

        for (const rule of RULES) {
            rule.regex.lastIndex = lastIndex
            const match = rule.regex.exec(code)
            if (match) {
                tokens.push({ type: rule.type, content: match[0] })
                lastIndex += match[0].length
                matchFound = true
                break
            }
        }

        if (!matchFound) {
            let plainContent = code[lastIndex]
            lastIndex++

            // Look ahead for next match to group plain text
            while (lastIndex < code.length) {
                let nextMatch = false
                for (const rule of RULES) {
                    rule.regex.lastIndex = lastIndex
                    const match = rule.regex.exec(code)
                    if (match) {
                        nextMatch = true
                        break
                    }
                }
                if (nextMatch) break
                plainContent += code[lastIndex]
                lastIndex++
            }
            tokens.push({ type: 'plain', content: plainContent })
        }
    }

    return tokens
}

interface CodeBlockProps {
  code: string
  className?: string
  style?: React.CSSProperties
  scrollAreaClassName?: string
  showCopyButton?: boolean
  language?: string
}

const getTokenColor = (type: TokenType) => {
  switch (type) {
    case 'keyword': return '#D73A49' // red
    case 'string': return '#032F62' // dark blue
    case 'comment': return '#6A737D' // gray
    case 'number': return '#005CC5' // blue
    case 'function': return '#6F42C1' // purple
    case 'tag': return '#005CC5' // blue
    case 'attr': return '#6F42C1' // purple
    case 'operator': return '#D73A49' // red
    default: return '#24292E'
  }
}

const CodeBlock: FC<CodeBlockProps> = ({ 
  code, 
  className, 
  style,
  scrollAreaClassName, 
  showCopyButton = true,
  language
}) => {
  const tokens = useMemo(() => tokenize(code), [code])

  const copyCode = async () => {
    await Taro.setClipboardData({ data: code })
    Taro.showToast({ title: '已复制', icon: 'success' })
  }

  return (
    <View className={cn("relative w-full overflow-hidden", className)} style={style}>
      <ScrollArea 
        orientation="both" 
        className={cn("bg-code rounded-lg w-full", scrollAreaClassName)}
      >
        <View className="p-4 inline-block box-border min-w-full">
          {language && (
            <Text className="absolute top-2 left-2 text-xs text-muted-foreground uppercase font-mono pointer-events-none">
              {language}
            </Text>
          )}
          <Text className="text-xs font-mono whitespace-pre">
            {tokens.map((token, i) => (
              <Text 
                key={i} 
                style={{ color: getTokenColor(token.type) }}
              >
                {token.content}
              </Text>
            ))}
          </Text>
        </View>
      </ScrollArea>
      {showCopyButton && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-1 right-1 h-6 w-6"
          onClick={copyCode}
        >
          <Copy size={12} color="#a3a3a3" />
        </Button>
      )}
    </View>
  )
}

export { CodeBlock }
