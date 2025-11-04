import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/lib/language';

export default function CreateProjectPage() {
  const { t } = useLanguage();
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [fundingGoal, setFundingGoal] = useState('');
  const [projectImageUrl, setProjectImageUrl] = useState('');
  const [tokenTicker, setTokenTicker] = useState('');
  const [totalSupply, setTotalSupply] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el proyecto
    console.log({
      projectName,
      projectDescription,
      fundingGoal,
      projectImageUrl,
      tokenTicker,
      totalSupply,
    });
    alert(t('project_submitted_alert'));
    // Reset form
    setProjectName('');
    setProjectDescription('');
    setFundingGoal('');
    setProjectImageUrl('');
    setTokenTicker('');
    setTotalSupply('');
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>{t('publish_new_project')}</CardTitle>
          <CardDescription>
            {t('fill_details_for_investors')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="projectName">{t('project_name')}</Label>
              <Input
                id="projectName"
                placeholder={t('my_innovative_project')}
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="projectDescription">{t('project_description')}</Label>
              <Textarea
                id="projectDescription"
                placeholder={t('describe_your_project')}
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="fundingGoal">{t('funding_goal_usd')}</Label>
              <Input
                id="fundingGoal"
                type="number"
                placeholder="100000"
                value={fundingGoal}
                onChange={(e) => setFundingGoal(e.target.value)}
                required
                min="1"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="projectImageUrl">{t('project_image_url')}</Label>
              <Input
                id="projectImageUrl"
                type="url"
                placeholder={t('project_image_url_placeholder')}
                value={projectImageUrl}
                onChange={(e) => setProjectImageUrl(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tokenTicker">{t('token_symbol')}</Label>
              <Input
                id="tokenTicker"
                placeholder="MYPROJ"
                value={tokenTicker}
                onChange={(e) => setTokenTicker(e.target.value.toUpperCase())}
                maxLength={10}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="totalSupply">{t('total_token_supply')}</Label>
              <Input
                id="totalSupply"
                type="number"
                placeholder="1000000"
                value={totalSupply}
                onChange={(e) => setTotalSupply(e.target.value)}
                required
                min="1"
              />
            </div>
            <Button type="submit" className="w-full">{t('publish_project_button')}</Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            {t('by_publishing_note')}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
