<script setup lang="ts">
const btns = [
	{
		icon: 'mdi-linkedin',
		link: 'https://www.linkedin.com/in/erick-germani/',
	},
];

function onClick(link: string) {
	window.open(link, '_blank');
}
</script>

<style lang="scss">
@import '_footer.styles';
</style>

<template>
	<v-footer class="bg-grey-lighten-1">
		<v-row justify="center" no-gutters>
			<v-btn
				v-for="btn in btns"
				:key="btn.icon"
				:icon="btn.icon"
				class="mx-2"
				color="white"
				rounded="xl"
				variant="text"
				@click="() => onClick(btn.link)"
			>
			</v-btn>
			<v-col class="text-center mt-4" cols="12">
				{{ new Date().getFullYear() }} — <strong>Knights Challenge</strong>
			</v-col>
			<p>
				Desenvolvido por
				<a href="https://www.linkedin.com/in/erick-germani/" target="_blank"
					>Erick Germani</a
				>
			</p>
		</v-row>
	</v-footer>
</template>
